import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    const result = await this.authService.signup(signupDto);
    return {
      success: true,
      message: result.message,
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto) {
    const result = await this.authService.signin(signinDto);
    return {
      success: true,
      message: 'Signin successful',
      data: {
        token: result.token,
        user: result.user,
      },
    };
  }
}
