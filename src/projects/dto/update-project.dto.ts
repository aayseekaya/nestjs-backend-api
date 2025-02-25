import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ description: 'Proje adı', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'İlerleme yüzdesi', required: false })
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;
} 