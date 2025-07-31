import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCartItemDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
