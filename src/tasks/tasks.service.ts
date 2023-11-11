import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async findById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async create(task: {
    title: string;
    content: string;
    userId: number;
  }): Promise<Task> {
    return this.prisma.task.create({ data: task });
  }

  async update(
    id: number,
    task: {
      title?: string;
      content?: string;
      completedAt?: Date | null;
      deletedAt?: Date | null;
      userId?: number;
    },
  ): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: task });
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
