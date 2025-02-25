import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SubTask extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0, max: 100 })
  weight: number;

  @Prop({ default: 0, min: 0, max: 100 })
  progress: number;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  taskId: Types.ObjectId;
}

export const SubTaskSchema = SchemaFactory.createForClass(SubTask); 