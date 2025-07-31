import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsNumber,
    IsOptional,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class CartItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
  
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsOptional()
    @IsString()
    image: string;
  
    @IsNumber()
    price: number;
  
    @IsOptional()
    @IsNumber()
    salePrice: number;
  
    @IsNumber()
    quantity: number;
  }
  
  class AddressInfoDto {
    @IsOptional()
    @IsString()
    addressId: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsString()
    city: string;
  
    @IsString()
    pincode: string;
  
    @IsString()
    phone: string;
  
    @IsOptional()
    @IsString()
    notes: string;
  }
  
  export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    cartItems: CartItemDto[];
  
    @ValidateNested()
    @Type(() => AddressInfoDto)
    addressInfo: AddressInfoDto;
  
    @IsOptional()
    @IsString()
    orderStatus?: string;
  
    @IsOptional()
    @IsString()
    paymentMethod?: string;
  
    @IsOptional()
    @IsString()
    paymentStatus?: string;
  
    @IsNumber()
    totalAmount: number;
  
    @IsOptional()
    @IsString()
    paymentId?: string;
  
    @IsOptional()
    @IsString()
    payerId?: string;
  }
  