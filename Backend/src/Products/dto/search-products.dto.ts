import { IsString, IsNotEmpty } from 'class-validator';

export class SearchProductsDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
