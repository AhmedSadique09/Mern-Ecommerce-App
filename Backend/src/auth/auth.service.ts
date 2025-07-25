import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserDocument } from '../user/models/user.model';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { errorHandler } from '../common/utils/error.utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(signupDto: SignupDto): Promise<{ message: string }> {
    try {
      const { username, email, password } = signupDto;

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw errorHandler(
          HttpStatus.CONFLICT,
          'User already exists',
          'Email already registered'
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.userModel({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return { message: 'Signup successful' };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong during signup',
        error.message
      );
    }
  }

  async signin(signinDto: SigninDto): Promise<{ token: string; user: any }> {
    try {
      const { email, password } = signinDto;

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw errorHandler(
          HttpStatus.UNAUTHORIZED,
          'Invalid credentials',
          'Email not found'
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw errorHandler(
          HttpStatus.UNAUTHORIZED,
          'Invalid credentials',
          'Password mismatch'
        );
      }

      if (!process.env.JWT_SECRET) {
        throw errorHandler(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'JWT secret is not defined',
        );
      }

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' },
      );

      const { password: _, ...userData } = user.toObject();

      return {
        token,
        user: userData,
      };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong during signin',
        error.message
      );
    }
  }
}
