import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './models/cart.model';
import { Product, ProductDocument } from '../Products/models/product.model';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { errorHandler } from 'src/common/utils/error.utils';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    // Add to cart
    async addToCart(addToCartDto: AddToCartDto) {
        const { userId, productId, quantity } = addToCartDto;

        if (!userId || !productId || quantity <= 0) {
            throw errorHandler(HttpStatus.BAD_REQUEST, 'Invalid data provided!');
        }

        const product = await this.productModel.findById(productId);
        if (!product) {
            throw errorHandler(HttpStatus.NOT_FOUND, 'Product not found!');
        }

        let cart = await this.cartModel.findOne({ userId });

        if (!cart) {
            cart = new this.cartModel({ userId, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId,
        );

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId: new Types.ObjectId(productId), quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }

        await cart.save();
        return { success: true, data: cart };
    }

    // Fetch Cart Items
    async fetchCartItems(userId: string) {
        if (!userId) {
            throw errorHandler(HttpStatus.BAD_REQUEST, 'User id is mandatory!');
        }

        const cart = await this.cartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        if (!cart) {
            throw errorHandler(HttpStatus.NOT_FOUND, 'Cart not found!');
        }

        const validItems = cart.items.filter((productItem) => productItem.productId);

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populatedCartItems = validItems.map((item: any) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        return {
            success: true,
            data: {
                _id: cart._id,
                userId: cart.userId,
                items: populatedCartItems,
                createdAt: cart.get('createdAt'),
                updatedAt: cart.get('updatedAt'),
            },
        };
    }

    // Update Cart Item Quantity
    async updateCartItemQty(updateCartItemDto: UpdateCartItemDto) {
        const { userId, productId, quantity } = updateCartItemDto;

        if (!userId || !productId || quantity <= 0) {
            throw errorHandler(HttpStatus.BAD_REQUEST, 'Invalid data provided!');
        }

        const cart = await this.cartModel.findOne({ userId });
        if (!cart) {
            throw errorHandler(HttpStatus.NOT_FOUND, 'Cart not found!');
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId,
        );

        if (findCurrentProductIndex === -1) {
            throw errorHandler(HttpStatus.NOT_FOUND, 'Product not found in cart!');
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        const populatedCartItems = cart.items.map((item: any) => ({
            productId: item.productId?._id,
            image: item.productId?.image,
            title: item.productId?.title ?? 'Product not found',
            price: item.productId?.price,
            salePrice: item.productId?.salePrice,
            quantity: item.quantity,
        }));

        return {
            success: true,
            data: {
                _id: cart._id,
                userId: cart.userId,
                items: populatedCartItems,
                createdAt: cart.get('createdAt'),
                updatedAt: cart.get('updatedAt'),
            },
        };
    }

    // Delete Cart Item
    async deleteCartItem(userId: string, productId: string) {
        if (!userId || !productId) {
            throw errorHandler(HttpStatus.BAD_REQUEST, 'Invalid data provided!');
        }

        const cart = await this.cartModel.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        if (!cart) {
            throw errorHandler(HttpStatus.NOT_FOUND, 'Cart not found!');
        }

        cart.items = cart.items.filter(
            (item) => item.productId && item.productId._id.toString() !== productId,
        );
        await cart.save();

        await cart.populate({
            path: 'items.productId',
            select: 'image title price salePrice',
        });

        const populatedCartItems = cart.items.map((item: any) => ({
            productId: item.productId?._id,
            image: item.productId?.image,
            title: item.productId?.title ?? 'Product not found',
            price: item.productId?.price,
            salePrice: item.productId?.salePrice,
            quantity: item.quantity,
        }));

        return {
            success: true,
            data: {
                _id: cart._id,
                userId: cart.userId,
                items: populatedCartItems,
                createdAt: cart.get('createdAt'),
                updatedAt: cart.get('updatedAt'),
            },
        };
    }
}
