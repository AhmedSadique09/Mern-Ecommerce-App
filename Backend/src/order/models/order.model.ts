import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop([
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      salePrice: { type: Number },
      quantity: { type: Number, required: true },
    },
  ])
  cartItems: {
    productId: string;
    title: string;
    image: string;
    price: number;
    salePrice: number;
    quantity: number;
  }[];

  @Prop({
    type: {
      addressId: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      phone: { type: String, required: true },
      notes: { type: String },
    },
  })
  addressInfo: {
    addressId: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes: string;
  };

  @Prop({ default: 'Processing' })
  orderStatus: string;

  @Prop()
  paymentMethod: string;

  @Prop()
  paymentStatus: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: Date.now })
  orderDate: Date;

  @Prop({ default: Date.now })
  orderUpdateDate: Date;

  @Prop()
  paymentId: string;

  @Prop()
  payerId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
