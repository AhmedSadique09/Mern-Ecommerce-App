import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { errorHandler } from '../common/utils/error.utils';
import { CloudinaryService } from '../helper/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Upload Image
  async uploadImage(file: Express.Multer.File) {
    try {
      if (!file) throw errorHandler(HttpStatus.BAD_REQUEST, 'No file uploaded');
      const result = await this.cloudinaryService.uploadImage(file);
      return { success: true, imageUrl: result.secure_url };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Image upload failed',
        error.message,
      );
    }
  }

  // Add Product
  async addProduct(createProductDto: CreateProductDto) {
    try {
      const newProduct = new this.productModel(createProductDto);
      await newProduct.save();
      return { success: true, product: newProduct };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to add product',
        error.message,
      );
    }
  }

  //  Get All Products
  async getAllProducts() {
    try {
      return await this.productModel.find();
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to fetch products',
        error.message,
      );
    }
  }

  //  Update Product
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        { $set: updateProductDto },
        { new: true },
      );

      if (!updatedProduct) {
        throw errorHandler(HttpStatus.NOT_FOUND, 'Product not found');
      }

      return { success: true, product: updatedProduct };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update product',
        error.message,
      );
    }
  }

  //  Delete Product
  async deleteProduct(id: string) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw errorHandler(HttpStatus.NOT_FOUND, 'Product not found');
      }

      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete product',
        error.message,
      );
    }
  }
}
