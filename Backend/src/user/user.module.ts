// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudinaryModule } from '../helper/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CloudinaryModule, // 👈 CloudinaryModule ko inject karo
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
