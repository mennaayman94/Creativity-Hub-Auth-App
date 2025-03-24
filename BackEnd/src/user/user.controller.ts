import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';
import { LoginDto } from './dto/logIn.dto';
import { generateToken } from 'src/utils/tokens';
import { Response } from 'express';
import { AuthMiddleware } from 'src/middlewares/auth';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @HttpCode(201)
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log("------Controller:registerUser------")

    try {
      const existingUser = await this.userService.findUserByEmail(
        createUserDto.email,
      );
      if (existingUser) {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.userService.create(createUserDto)
    } catch (error) {
        const errorMessage = error.message || 'An error occurred during the request';
        const errorStack = error.stack || 'No stack trace available';
        throw new InternalServerErrorException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal server error occurred.',
              error: errorMessage, // Add the error message from the caught error
              stack: errorStack,   // Optional: Include the error stack trace for debugging purposes
            },
          );
    }
  }
  @Post('/login')
  @HttpCode(200)
  async logInUser(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ) {
    this.logger.log("------Controller:logInUser------")

    try {
      const existingUser = await this.userService.findUserByEmailAndPassword(
        loginDto.email,
        loginDto.password,
      );
      if (!existingUser) {
        throw new HttpException('Invalid Login', HttpStatus.BAD_REQUEST);
      }
      const token = generateToken(existingUser);
      res.cookie('jwt', token, {
        httpOnly: true, // Make the cookie inaccessible to JavaScript
        secure: true, 
        maxAge: 60*60*100, // Token expiration time (1 hour in milliseconds)
        sameSite:"none",
      });
      return res.status(HttpStatus.OK).json({
        message: 'User is logged in successfully',
        userId:existingUser.userId
      });
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.message,
      });
    }
  }
  @Get('/profile/:id')
  @HttpCode(200)
  @UseGuards(AuthMiddleware)
  async findUserById(@Param('id') id: string) : Promise<User> {
    this.logger.log("------Controller:findUserById------")

    try {
        if (!id){
            throw new HttpException(
                'Id is not provided',
                HttpStatus.BAD_REQUEST,
              );  
        }
      const existingUser = await this.userService.findUserByUserId(
        id,
      );
      if (!existingUser) {
        throw new HttpException(
          'User is not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return existingUser
    } catch (error) {
      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
        
      );
    }
  }
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    // Clear the authentication cookie
    res.clearCookie('jwt', { httpOnly: true, secure: true});

    // Optionally, you can send a success response
    res.status(200).send({ message: 'Logged out successfully' });
  }
}
