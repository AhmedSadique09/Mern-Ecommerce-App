import { Injectable, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './models/user.model';
import { UpdateProfileDto } from './dto/update-user.dto';
import { errorHandler } from '../common/utils/error.utils';
import { CloudinaryService } from '../helper/cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  async updateProfile(
    userId: string,
    updateDto: UpdateProfileDto,
    file?: Express.Multer.File,
  ) {
    try {
      const updateData: Partial<User> = {};

      if (updateDto.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateDto.password, salt);
      }

      if (updateDto.username) {
        updateData.username = updateDto.username;
      }

      if (file) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        updateData.profilePicture = uploadResult.secure_url;
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true },
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
        error.message,
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
        error.message,
      );
    }
  }
}
