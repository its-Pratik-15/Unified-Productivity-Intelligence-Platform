import { PrismaClient } from '@prisma/client';

export class Database {
    private static instance: Database;
    public prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    static resetInstance(): void {
        if (Database.instance) {
            Database.instance.prisma.$disconnect();
        }
        Database.instance = null as any;
    }

    getPrisma(): PrismaClient {
        return this.prisma;
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}
