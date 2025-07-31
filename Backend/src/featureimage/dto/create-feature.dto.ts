import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  image: string;
}
