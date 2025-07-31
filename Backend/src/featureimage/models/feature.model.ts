import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeatureDocument = Feature & Document;

@Schema({ timestamps: true })
export class Feature {
  @Prop({ required: true })
  image: string;
}

export const FeatureSchema = SchemaFactory.createForClass(Feature);
