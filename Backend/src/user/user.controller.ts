import {
  Controller,
  Patch,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('profilePicture'))
  async updateProfile(
    @Request() req,
    @Body() updateDto: UpdateProfileDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const userId = req.user?.id;
    return await this.userService.updateProfile(userId, updateDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Request() req) {
    const userId = req.user?.id;
    return await this.userService.deleteUser(userId);
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  signout() {
    return {
      message: 'Signout successful',
      success: true,
    };
  }
}
