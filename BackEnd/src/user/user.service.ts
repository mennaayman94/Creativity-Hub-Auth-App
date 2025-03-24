import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { comparePasswords, hashPassword, validatePassword } from 'src/utils/password';
import { v7 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  // create user in users collection
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('-----Service:create user------');
    const { email, password, name } = createUserDto;
    const userId = v7();
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Password should be at least 8 characters, contains at least one special character,one number and one letter');
    }
    //hash password for security to be saved in DB
    const hashedPassword = await hashPassword(password);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      name,
      userId,
    });
    const user = await newUser.save();
    //serialize the resulted user
    return plainToClass(User, user.toObject());
  }
  ///find user by email
  async findUserByEmail(email: string): Promise<User | null> {
    this.logger.log('------Service:findUserByEmail------');

    // Check if the email already exists
    const existingUser = await this.userModel.findOne({ email });
    return existingUser;
  }
  //find user by id 
  async findUserByUserId(id: string): Promise<User | null> {
    this.logger.log('------Service:findUserByUserId------');

    const existingUser = await this.userModel.findOne({ userId:id});
    return plainToClass(User, existingUser?.toObject());;
  }
  //find user by email and password
  async findUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    this.logger.log('------Service:findUserByEmailAndPassword------');

    const existingUser = await this.findUserByEmail(email);
    if (existingUser) {

      //compare password  from user with the hashed password
      const isValid = await comparePasswords(password, existingUser.password);
      if (isValid) {
        return existingUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
