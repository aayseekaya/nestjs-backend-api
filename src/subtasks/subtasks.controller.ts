import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SubTasksService } from './subtasks.service';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@ApiTags('subtasks')
@Controller('subtasks')
export class SubTasksController {
  constructor(private readonly subTasksService: SubTasksService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni alt görev oluştur' })
  create(@Body() createSubTaskDto: CreateSubTaskDto) {
    return this.subTasksService.create(createSubTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm alt görevleri listele' })
  findAll() {
    return this.subTasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID ile alt görev getir' })
  findOne(@Param('id') id: string) {
    return this.subTasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Alt görev güncelle' })
  update(@Param('id') id: string, @Body() updateSubTaskDto: UpdateSubTaskDto) {
    return this.subTasksService.update(id, updateSubTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Alt görev sil' })
  remove(@Param('id') id: string) {
    return this.subTasksService.remove(id);
  }
} 