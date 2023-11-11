import { Injectable } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';

@Injectable()
export class TasksService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { deletedAt: null } });
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

  /** NOTE: 論理削除 */
  async delete(id: number): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  /** タスクを完了する */
  async complete(id: number): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: { completedAt: new Date() },
    });
  }
}
