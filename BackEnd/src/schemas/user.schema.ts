import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Matches } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique:true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  })
  email: string;

  @Prop({ required: true, min: 3})
  name: string;

  @Prop({ required: true })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
      message:
        'Password should be at least 8 characters, contains at least one special character,one number and one letter',
    })
  @Exclude()
  password: string;

  @Prop({ required: true, unique: true })
  userId: string;
  @Exclude()
  _id: string;

  @Exclude()
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
