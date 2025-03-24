import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Input should be in email format' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email should be string' })
  email: string;

  @IsString({ message: 'Name should be string' })
  @IsNotEmpty({ message: 'Name is required.' })
  @MinLength(3, { message: 'Name should be at least 3 characters' })
  name: string;

  @IsString()
  @MinLength(8, { message: 'Password should be at least 8 characters' })
  @IsNotEmpty({ message: 'Password is required.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password should be at least 8 characters, contains at least one special character,one number and one letter',
  })
  password: string;
}
