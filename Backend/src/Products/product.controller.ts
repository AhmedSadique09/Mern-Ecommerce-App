import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ✅ Upload Image
  @Post('upload')
  @Roles('admin')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadImage(file);
  }

  // Add New Product
  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.addProduct(createProductDto);
  }

  //  Get All Products
  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  //  Update Product
  @Patch(':id')
  @Roles('admin')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  // Delete Product
  @Delete(':id')
  @Roles('admin')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

    //  Filter Products
  @Get('filter')
  async getFilteredProducts(@Query() query: FilterProductDto) {
    return this.productService.getFilteredProducts(query);
  }

  //  Product Details
  @Get(':id')
  async getProductDetails(@Param('id') id: string) {
    return this.productService.getProductDetails(id);
  }


}
