import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    async addToCart(@Body() addToCartDto: AddToCartDto) {
        return this.cartService.addToCart(addToCartDto);
    }

    @Get(':userId')
    async fetchCartItems(@Param('userId') userId: string) {
        return this.cartService.fetchCartItems(userId);
    }

    @Patch()
    async updateCartItemQty(@Body() updateCartItemDto: UpdateCartItemDto) {
        return this.cartService.updateCartItemQty(updateCartItemDto);
    }

    @Delete(':userId/:productId')
    async deleteCartItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.cartService.deleteCartItem(userId, productId);
    }
}
