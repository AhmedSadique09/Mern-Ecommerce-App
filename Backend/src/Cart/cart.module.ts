import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './models/cart.model';
import { Product, ProductSchema } from '../Products/models/product.model';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Cart.name, schema: CartSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule { }
