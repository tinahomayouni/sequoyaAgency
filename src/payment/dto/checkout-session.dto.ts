// checkout.dto.ts

import { IsString, IsNumber, IsUrl, IsNotEmpty } from 'class-validator';

class LineItemDto {
  @IsString()
  price: string;

  @IsNumber()
  quantity: number;
}

export class CheckoutDto {
  @IsNotEmpty()
  line_items: LineItemDto[];

  @IsString()
  mode: string;

  @IsUrl()
  success_url: string;

  @IsUrl()
  cancel_url: string;
}
