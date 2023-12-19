// src/auth/dto/user.request.signup.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';

export class UserReqSignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'tinaHoma', description: 'The username of the user' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'tinahomayouni@gmail.com',
    description: 'The email address of the user',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: '1234567', description: 'The password of the user' })
  readonly password: string;

  @IsIn(['gold', 'silver', 'bronze'])
  @ApiProperty({
    example: 'gold',
    description: 'The plan of the user (gold, silver, bronze)',
    default: 'gold', // Set a default value
  })
  readonly plan: string = 'gold'; // Provide a default value for plan

  @IsNotEmpty()
  @ApiProperty({
    example: 'user',
    default: 'user', // Set a default value
    description: 'The role of the user (admin, user)',
  })
  readonly role: string = 'user'; // Provide a default value for role

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'pm_card_visa',
    description: 'The payment method id from the frontend',
  })
  readonly paymentMethodId: string;
}
