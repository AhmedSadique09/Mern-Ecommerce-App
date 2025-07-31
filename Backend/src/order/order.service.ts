import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './models/order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { errorHandler } from '../common/utils/error.utils';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      if (!createOrderDto.userId || !createOrderDto.cartItems.length || !createOrderDto.addressInfo || !createOrderDto.totalAmount) {
        throw errorHandler(HttpStatus.BAD_REQUEST, 'Required fields are missing');
      }

      const order = new this.orderModel({
        ...createOrderDto,
        orderStatus: createOrderDto.orderStatus || 'Processing',
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      });

      const savedOrder = await order.save();
      return { success: true, data: savedOrder };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create order',
        error.message,
      );
    }
  }

  // Delete Order
  async deleteOrder(orderId: string) {
    try {
      const deletedOrder = await this.orderModel.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        throw errorHandler(HttpStatus.NOT_FOUND, 'Order not found');
      }

      return { success: true, message: 'Order deleted successfully' };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete order',
        error.message,
      );
    }
  }
}
