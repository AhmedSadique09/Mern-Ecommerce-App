import {
  Controller,
  Patch,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Request() req, @Body() updateDto: UpdateProfileDto) {
    const userId = req.user?.id;
    return await this.userService.updateProfile(userId, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-account')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Request() req) {
    const userId = req.user?.id;
    return await this.userService.deleteUser(userId);
  }
}
