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
  @ApiProperty({ example: 'somy', description: 'The username of the user' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'somy@gmail.com',
    description: 'The email address of the user',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'somy7654321',
    description: 'The password of the user',
  })
  readonly password: string;
}
