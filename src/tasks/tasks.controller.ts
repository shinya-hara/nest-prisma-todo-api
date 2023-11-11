import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.tasksService.findById(Number(id));
  }

  @Post()
  create(@Body() task: { title: string; content: string; userId: number }) {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    task: {
      title?: string;
      content?: string;
      completedAt?: Date | null;
      deletedAt?: Date | null;
      userId?: number;
    },
  ) {
    return this.tasksService.update(Number(id), task);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.delete(Number(id));
  }
}
