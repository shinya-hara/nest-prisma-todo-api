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
}
