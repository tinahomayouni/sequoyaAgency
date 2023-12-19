// src/payment/dto/checkout-session.dto.ts
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CheckoutSessionDto {
  @IsArray()
  @IsNotEmpty()
  line_items: LineItemDto[];

  @IsString()
  @IsNotEmpty()
  mode: string;

  @IsString()
  @IsNotEmpty()
  success_url: string;

  @IsString()
  @IsNotEmpty()
  cancel_url: string;
}

class LineItemDto {
  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  quantity: number;
}
