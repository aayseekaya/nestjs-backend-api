import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @ApiProperty({ description: 'Görev adı' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Görev ağırlığı (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  weight: number;

  @ApiProperty({ description: 'Proje ID' })
  @IsNotEmpty()
  projectId: Types.ObjectId;
} 