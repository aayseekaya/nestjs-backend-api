import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0, max: 100 })
  weight: number;

  @Prop({ default: 0 })
  progress: number;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'SubTask' }] })
  subTasks: Types.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task); 