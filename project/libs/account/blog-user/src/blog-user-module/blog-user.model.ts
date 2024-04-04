import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@project/core';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements User {
  @Prop()
  public avatar: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public fullname: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);