import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  notes?: string;
}
