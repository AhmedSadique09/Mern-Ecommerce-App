import { Injectable, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
import { UpdateProfileDto } from './dto/update-user.dto';
import { errorHandler } from '../common/utils/error.utils';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

 async updateProfile(userId: string, updateDto: UpdateProfileDto) {
  try {
    const updateData: Partial<User> = {};

    if (updateDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateDto.password, salt);
    }

    if (updateDto.username) {
      updateData.username = updateDto.username;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      throw errorHandler(HttpStatus.NOT_FOUND, 'User not found');
    }

    const { password, ...userData } = updatedUser.toObject();

    return {
      message: 'Profile updated successfully',
      user: userData,
    };
  } catch (error) {
    throw errorHandler(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Profile update failed',
      error.message
    );
  }
}

async deleteUser(userId: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        throw errorHandler(HttpStatus.NOT_FOUND, 'User not found');
      }

      return {
        message: 'User account deleted successfully',
      };
    } catch (error) {
      throw errorHandler(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete user account',
        error.message
      );
    }
  }

}
