// src/auth/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserReqLoginDto {
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
}
