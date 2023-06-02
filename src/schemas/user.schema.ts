import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';


@Schema()
export class User {
  @Prop()
  userId : number
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  firstname: string;
  @Prop({ required: true })
  lastname: string;
  @Prop({ required: true })
  email :string;
  @Prop({ required: false })
  avatar :string
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);