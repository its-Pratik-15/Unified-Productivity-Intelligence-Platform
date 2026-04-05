import { Database } from '../core/Database.js';

export class DashboardService {
    private db = Database.getInstance();

    async getDashboardData(userId: string): Promise<any> {
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const todayEnd = new Date(now.setHours(23, 59, 59, 999));
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Get pending assignments
        const pendingTasks = await this.db.prisma.task.findMany({
            where: {
                userId,
                status: { not: 'completed' },
            },
            orderBy: { dueDate: 'asc' },
        });

        // Get upcoming deadlines (next 7 days)
        const upcomingDeadlines = pendingTasks
            .filter(t => t.dueDate && new Date(t.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
            .slice(0, 4)
            .map(t => ({
                id: t.id,
                title: t.title,
                subject: this.extractSubject(t.title),
                dueDate: t.dueDate,
                urgent: t.dueDate ? this.isUrgent(new Date(t.dueDate)) : false,
            }));

        // Get focus sessions for today
        const todaySessions = await this.db.prisma.focusSession.findMany({
            where: {
                userId,
                phase: 'work',
                startedAt: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });

        const todayStudyMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);

        // Get study streak
        const streak = await this.calculateStreak(userId);

        // Get exams this week (tasks with high priority and due this week)
        const examsThisWeek = pendingTasks.filter(
            t => t.priority === 'high' &&
                t.dueDate &&
                new Date(t.dueDate) >= todayStart &&
                new Date(t.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );

        // Calculate study score (based on completed tasks and study time)
        const completedToday = await this.db.prisma.task.count({
            where: {
                userId,
                status: 'completed',
                createdAt: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });

        const studyScore = Math.min(100, Math.round((todayStudyMinutes / 180) * 50 + completedToday * 10));

        // Get revision topics (from notes older than 3 days)
        const revisionTopics = await this.db.prisma.note.findMany({
            where: {
                userId,
                updatedAt: {
                    lt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                },
            },
            take: 3,
            orderBy: { updatedAt: 'asc' },
        });

        return {
            stats: {
                pendingAssignments: pendingTasks.length,
                streak,
                examsThisWeek: examsThisWeek.length,
                studyScore,
                todayHours: (todayStudyMinutes / 60).toFixed(1),
            },
            upcomingDeadlines,
            todayPlan: this.generateTodayPlan(pendingTasks),
            revisionDue: revisionTopics.map(note => ({
                id: note.id,
                topic: note.title,
                subject: this.extractSubject(note.title),
                lastStudied: this.getRelativeTime(note.updatedAt),
            })),
        };
    }

    private extractSubject(title: string): string {
        const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'History', 'Biology'];
        for (const subject of subjects) {
            if (title.toLowerCase().includes(subject.toLowerCase())) {
                return subject;
            }
        }
        return 'General';
    }

    private isUrgent(dueDate: Date): boolean {
        const now = new Date();
        const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= 2;
    }

    private getRelativeTime(date: Date): string {
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'today';
        if (diffDays === 1) return 'yesterday';
        return `${diffDays} days ago`;
    }

    private async calculateStreak(userId: string): Promise<number> {
        const sessions = await this.db.prisma.focusSession.findMany({
            where: { userId, phase: 'work' },
            orderBy: { startedAt: 'desc' },
            take: 30,
        });

        if (sessions.length === 0) return 0;

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < 30; i++) {
            const dayStart = new Date(currentDate);
            const dayEnd = new Date(currentDate);
            dayEnd.setHours(23, 59, 59, 999);

            const hasSession = sessions.some(s => {
                const sessionDate = new Date(s.startedAt);
                return sessionDate >= dayStart && sessionDate <= dayEnd;
            });

            if (hasSession) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    private generateTodayPlan(tasks: any[]): any[] {
        const plan: any[] = [];
        const startHour = 9;

        tasks.slice(0, 4).forEach((task, i) => {
            const hour = startHour + i;
            plan.push({
                time: `${String(hour).padStart(2, '0')}:00`,
                task: task.title,
                subject: this.extractSubject(task.title),
                duration: '45 min',
            });
        });

        return plan;
    }
}
