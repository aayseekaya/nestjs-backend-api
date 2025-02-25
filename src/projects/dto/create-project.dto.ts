import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Proje adı' })
  @IsString()
  @IsNotEmpty()
  name: string;
} 