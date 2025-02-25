import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().populate('tasks').exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).populate('tasks').exec();
    if (!project) {
      throw new NotFoundException(`Proje bulunamadı ID: ${id}`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (!project) {
      throw new NotFoundException(`Proje bulunamadı ID: ${id}`);
    }
    return project;
  }

  async remove(id: string): Promise<Project> {
    const project = await this.projectModel.findByIdAndDelete(id).exec();
    if (!project) {
      throw new NotFoundException(`Proje bulunamadı ID: ${id}`);
    }
    return project;
  }

  async uploadFile(id: string, filename: string): Promise<Project> {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException(`Proje bulunamadı ID: ${id}`);
    }
    project.files.push(filename);
    return project.save();
  }

  async getProjectStats(ids?: string[]): Promise<any> {
    const query = ids ? { _id: { $in: ids } } : {};
    const projects = await this.projectModel.find(query).exec();
    
    return projects.map(project => ({
      id: project._id,
      name: project.name,
      progress: project.progress,
      filesCount: project.files.length
    }));
  }
} 