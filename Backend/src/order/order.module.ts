import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './models/order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule { }
