import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Görev adı', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Görev ağırlığı (0-100)', required: false })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  weight?: number;

  @ApiProperty({ description: 'İlerleme yüzdesi (0-100)', required: false })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;
} 