import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/models/user.model';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: '' })
  notes: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
