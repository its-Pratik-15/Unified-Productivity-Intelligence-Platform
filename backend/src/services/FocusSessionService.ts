import { Database } from '../core/Database.js';

export class FocusSessionService {
    private db = Database.getInstance();

    async createSession(
        userId: string,
        subject: string,
        duration: number,
        phase: string,
        startedAt: Date,
        endedAt: Date
    ): Promise<any> {
        return await this.db.prisma.focusSession.create({
            data: {
                userId,
                subject,
                duration,
                phase,
                startedAt,
                endedAt,
            },
        });
    }

    async getUserSessions(userId: string, limit?: number): Promise<any[]> {
        return await this.db.prisma.focusSession.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            ...(limit && { take: limit }),
        });
    }

    async getSessionsByDateRange(
        userId: string,
        startDate: Date,
        endDate: Date
    ): Promise<any[]> {
        return await this.db.prisma.focusSession.findMany({
            where: {
                userId,
                startedAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { startedAt: 'asc' },
        });
    }

    async getSessionStats(userId: string): Promise<any> {
        const sessions = await this.db.prisma.focusSession.findMany({
            where: { userId, phase: 'work' },
        });

        const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
        const totalSessions = sessions.length;

        // Group by subject
        const bySubject = sessions.reduce((acc: any, session) => {
            if (!acc[session.subject]) {
                acc[session.subject] = { count: 0, minutes: 0 };
            }
            acc[session.subject].count += 1;
            acc[session.subject].minutes += session.duration;
            return acc;
        }, {});

        return {
            totalMinutes,
            totalSessions,
            bySubject,
        };
    }

    async getWeeklySessionData(userId: string): Promise<any[]> {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const sessions = await this.db.prisma.focusSession.findMany({
            where: {
                userId,
                phase: 'work',
                startedAt: {
                    gte: weekAgo,
                },
            },
            orderBy: { startedAt: 'asc' },
        });

        // Group by day and subject
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekData: any[] = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(now.getTime() - (6 - i) * 24 * 60 * 60 * 1000);
            const dayName = days[date.getDay()];

            const daySessions = sessions.filter(s => {
                const sessionDate = new Date(s.startedAt);
                return sessionDate.toDateString() === date.toDateString();
            });

            const subjectData: any = {};
            daySessions.forEach(session => {
                if (!subjectData[session.subject]) {
                    subjectData[session.subject] = 0;
                }
                subjectData[session.subject] += session.duration;
            });

            weekData.push({
                day: dayName,
                date: date.toISOString().split('T')[0],
                ...subjectData,
                total: daySessions.reduce((sum, s) => sum + s.duration, 0),
            });
        }

        return weekData;
    }
}
