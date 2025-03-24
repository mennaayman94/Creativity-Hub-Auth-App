import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Input should be in email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email should be string' })
  email: string;

  password: string;
}