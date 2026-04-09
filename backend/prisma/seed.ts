import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create test user
    const user = await prisma.user.upsert({
        where: { email: 'student@nexaproductivity.com' },
        update: {},
        create: {
            id: 'test-user-001',
            name: 'Alex Student',
            email: 'student@nexaproductivity.com',
        },
    });
    console.log('✅ Created user:', user.email);

    // Create tasks (assignments)
    const tasks = [
        {
            id: 'task-001',
            title: 'Calculus Integration Assignment',
            status: 'pending',
            priority: 'high',
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
            userId: user.id,
        },
        {
            id: 'task-002',
            title: 'Physics Lab Report - Newton\'s Laws',
            status: 'pending',
            priority: 'high',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
            userId: user.id,
        },
        {
            id: 'task-003',
            title: 'Chemistry Organic Compounds Quiz',
            status: 'pending',
            priority: 'medium',
            dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // In 4 days
            userId: user.id,
        },
        {
            id: 'task-004',
            title: 'English Literature Essay - Shakespeare',
            status: 'pending',
            priority: 'medium',
            dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // In 6 days
            userId: user.id,
        },
        {
            id: 'task-005',
            title: 'Computer Science Data Structures Project',
            status: 'in-progress',
            priority: 'high',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
            userId: user.id,
        },
        {
            id: 'task-006',
            title: 'History World War II Research Paper',
            status: 'pending',
            priority: 'low',
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // In 10 days
            userId: user.id,
        },
        {
            id: 'task-007',
            title: 'Mathematics Trigonometry Practice Set',
            status: 'completed',
            priority: 'medium',
            dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            userId: user.id,
        },
        {
            id: 'task-008',
            title: 'Biology Cell Structure Diagram',
            status: 'completed',
            priority: 'low',
            dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            userId: user.id,
        },
    ];

    for (const task of tasks) {
        await prisma.task.upsert({
            where: { id: task.id },
            update: {},
            create: task,
        });
    }
    console.log(`✅ Created ${tasks.length} tasks`);

    // Create notes
    const notes = [
        {
            id: 'note-001',
            title: 'Mathematics - Calculus Chapter 5 Summary',
            content: 'Integration techniques: substitution, by parts, partial fractions. Key formulas and examples from class.',
            userId: user.id,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'note-002',
            title: 'Physics - Newton\'s Three Laws',
            content: 'First law: inertia. Second law: F=ma. Third law: action-reaction pairs. Examples and applications.',
            userId: user.id,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'note-003',
            title: 'Chemistry - Organic Chemistry Basics',
            content: 'Functional groups, nomenclature, isomers. Alkanes, alkenes, alkynes structures and properties.',
            userId: user.id,
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'note-004',
            title: 'Computer Science - Binary Search Trees',
            content: 'BST properties, insertion, deletion, traversal algorithms. Time complexity analysis.',
            userId: user.id,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'note-005',
            title: 'English - Shakespeare Themes',
            content: 'Common themes in Shakespeare: love, power, betrayal, fate. Analysis of major works.',
            userId: user.id,
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        },
    ];

    for (const note of notes) {
        await prisma.note.upsert({
            where: { id: note.id },
            update: {},
            create: note,
        });
    }
    console.log(`✅ Created ${notes.length} notes`);

    // Create focus sessions (last 7 days)
    const focusSessions: Array<{
        userId: string;
        subject: string;
        duration: number;
        phase: string;
        startedAt: Date;
        endedAt: Date;
    }> = [];
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English', 'History'];

    for (let day = 6; day >= 0; day--) {
        const sessionsPerDay = Math.floor(Math.random() * 3) + 2; // 2-4 sessions per day

        for (let session = 0; session < sessionsPerDay; session++) {
            const subject = subjects[Math.floor(Math.random() * subjects.length)];
            const durations = [25, 30, 45, 50];
            const duration = durations[Math.floor(Math.random() * 4)] || 25;
            const startHour = 9 + session * 2;

            const startedAt = new Date();
            startedAt.setDate(startedAt.getDate() - day);
            startedAt.setHours(startHour, 0, 0, 0);

            const endedAt = new Date(startedAt);
            endedAt.setMinutes(endedAt.getMinutes() + duration);

            if (subject) {
                focusSessions.push({
                    userId: user.id,
                    subject,
                    duration,
                    phase: 'work',
                    startedAt,
                    endedAt,
                });
            }
        }
    }

    for (const session of focusSessions) {
        await prisma.focusSession.create({
            data: session,
        });
    }
    console.log(`✅ Created ${focusSessions.length} focus sessions`);

    // Create reminders
    const reminders = [
        {
            id: 'reminder-001',
            type: 'task',
            title: 'Calculus Assignment Due',
            userId: user.id,
            subject: 'Mathematics',
            date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            time: '23:59',
            notifyBefore: '1 day',
            email: 'student@nexaproductivity.com',
            status: 'active',
        },
        {
            id: 'reminder-002',
            type: 'custom',
            title: 'Study Group Meeting',
            userId: user.id,
            subject: null,
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            time: '15:00',
            notifyBefore: '2 hours',
            email: 'student@nexaproductivity.com',
            status: 'active',
        },
        {
            id: 'reminder-003',
            type: 'task',
            title: 'Physics Lab Report Submission',
            userId: user.id,
            subject: 'Physics',
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            time: '18:00',
            notifyBefore: '1 day',
            email: 'student@nexaproductivity.com',
            status: 'active',
        },
    ];

    for (const reminder of reminders) {
        await prisma.notification.upsert({
            where: { id: reminder.id },
            update: {},
            create: reminder,
        });
    }
    console.log(`✅ Created ${reminders.length} reminders`);

    console.log('🎉 Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
