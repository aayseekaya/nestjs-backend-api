import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SubTask } from './schemas/subtask.schema';
import { Task } from '../tasks/schemas/task.schema';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubTasksService {
  constructor(
    @InjectModel(SubTask.name) private subTaskModel: Model<SubTask>,
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async create(createSubTaskDto: CreateSubTaskDto): Promise<SubTask> {
    const task = await this.taskModel.findById(createSubTaskDto.taskId);
    if (!task) {
      throw new NotFoundException('Görev bulunamadı');
    }

    const subTask = new this.subTaskModel(createSubTaskDto);
    const savedSubTask = await subTask.save();

    task.subTasks.push(savedSubTask._id as unknown as Types.ObjectId);
    await task.save();

    return savedSubTask;
  }

  async findAll(): Promise<SubTask[]> {
    return this.subTaskModel.find().exec();
  }

  async findOne(id: string): Promise<SubTask> {
    const subTask = await this.subTaskModel.findById(id).exec();
    if (!subTask) {
      throw new NotFoundException(`Alt görev bulunamadı ID: ${id}`);
    }
    return subTask;
  }

  async update(id: string, updateSubTaskDto: UpdateSubTaskDto): Promise<SubTask> {
    const subTask = await this.subTaskModel
      .findByIdAndUpdate(id, updateSubTaskDto, { new: true })
      .exec();
    
    if (!subTask) {
      throw new NotFoundException(`Alt görev bulunamadı ID: ${id}`);
    }

    if (updateSubTaskDto.progress !== undefined) {
      await this.updateTaskProgress(subTask.taskId.toString());
    }

    return subTask;
  }

  async remove(id: string): Promise<SubTask> {
    const subTask = await this.subTaskModel.findByIdAndDelete(id).exec();
    if (!subTask) {
      throw new NotFoundException(`Alt görev bulunamadı ID: ${id}`);
    }

    await this.taskModel.updateOne(
      { _id: subTask.taskId },
      { $pull: { subTasks: subTask._id } }
    );

    return subTask;
  }

  private async updateTaskProgress(taskId: string): Promise<void> {
    const subTasks = await this.subTaskModel.find({ taskId }).exec();
    if (subTasks.length === 0) return;

    const totalWeight = subTasks.reduce((sum, subTask) => sum + subTask.weight, 0);
    const weightedProgress = subTasks.reduce(
      (sum, subTask) => sum + (subTask.progress * subTask.weight) / 100,
      0
    );

    const taskProgress = totalWeight > 0 ? (weightedProgress / totalWeight) * 100 : 0;

    await this.taskModel.findByIdAndUpdate(
      taskId,
      { progress: taskProgress },
      { new: true }
    );
  }
} 