import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { Project } from '../projects/schemas/project.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectModel.findById(createTaskDto.projectId);
    if (!project) {
      throw new NotFoundException('Proje bulunamadı');
    }

    const task = new this.taskModel(createTaskDto);
    const savedTask = await task.save();

    project.tasks.push(savedTask._id as unknown as Types.ObjectId);
    await project.save();

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().populate('subTasks').exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).populate('subTasks').exec();
    if (!task) {
      throw new NotFoundException(`Görev bulunamadı ID: ${id}`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    
    if (!task) {
      throw new NotFoundException(`Görev bulunamadı ID: ${id}`);
    }

    if (updateTaskDto.progress !== undefined || updateTaskDto.weight !== undefined) {
      await this.updateProjectProgress(task.projectId.toString());
    }

    return task;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.taskModel.findByIdAndDelete(id).exec();
    if (!task) {
      throw new NotFoundException(`Görev bulunamadı ID: ${id}`);
    }

    // Projeden görevi kaldır
    await this.projectModel.updateOne(
      { _id: task.projectId },
      { $pull: { tasks: task._id } }
    );

    return task;
  }

  async updateProjectProgress(projectId: string): Promise<void> {
    const tasks = await this.taskModel.find({ projectId }).exec();
    if (tasks.length === 0) return;

    const totalWeight = tasks.reduce((sum, task) => sum + task.weight, 0);
    const weightedProgress = tasks.reduce(
      (sum, task) => sum + (task.progress * task.weight) / totalWeight,
      0
    );

    await this.projectModel.findByIdAndUpdate(
      projectId,
      { progress: Math.round(weightedProgress * 100) / 100 },
      { new: true }
    );
  }
} 