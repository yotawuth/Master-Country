import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users } from 'src/model/users.model';

@Module({
  imports:[MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
