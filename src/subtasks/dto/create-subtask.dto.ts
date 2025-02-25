import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSubTaskDto {
  @ApiProperty({ description: 'Alt görev adı' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Alt görev ağırlığı (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  weight: number;

  @ApiProperty({ description: 'Bağlı olduğu görev ID' })
  @IsNotEmpty()
  taskId: Types.ObjectId;
} 