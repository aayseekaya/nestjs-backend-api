import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubTasksController } from './subtasks.controller';
import { SubTasksService } from './subtasks.service';
import { SubTask, SubTaskSchema } from './schemas/subtask.schema';
import { Task, TaskSchema } from '../tasks/schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubTask.name, schema: SubTaskSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [SubTasksController],
  providers: [SubTasksService],
  exports: [SubTasksService],
})
export class SubTasksModule {} 