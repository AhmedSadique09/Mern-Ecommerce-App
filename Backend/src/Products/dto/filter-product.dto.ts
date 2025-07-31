import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsString()
  category?: string; 

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  @IsIn(['price-lowtohigh', 'price-hightolow', 'price-atoz', 'price-ztoa'], {
    message: 'sortBy must be one of price-lowtohigh, price-hightolow, price-atoz, price-ztoa',
  })
  sortBy?: string = 'price-lowtohigh'; // default
}
