import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument ,Schema as MongooseSchema} from 'mongoose';
import { Country } from './country.model';

export type UserDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({required:true})
  username: string;

  @Prop({required:true})
  password: string;

  @Prop({ type: MongooseSchema.Types.String , ref: 'Country' })
  country: Country;

}

export const UserSchema = SchemaFactory.createForClass(Users);