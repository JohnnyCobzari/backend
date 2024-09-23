import { Controller, Post, Body, Get, BadRequestException, Param, HttpCode, NotFoundException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { CreateLocalDto } from './dto/local-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  // Route for requesting password reset - accessible without token
  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async postReset(@Body('email') email: string) {
    try {
      await this.authService.sendResetLink(email);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Route for setting a new password after reset link - accessible without token
  @Post('/new-password')
  async postNewPassword(@Body() newPasswordDto: NewPasswordDto): Promise<{ message: string }> {
    await this.authService.postNewPassword(newPasswordDto);
    return { message: 'Password updated successfully' };
  }

  // Route for getting the reset token verification - accessible without token
  @Get('/reset/:token')
  async getNewPassword(@Param('token') token: string): Promise<{ userId: string; passwordToken: string }> {
    const user = await this.authService.findUserByResetToken(token);

    if (!user) {
      throw new NotFoundException('Invalid token or token has expired.');
    }

    return {
      userId: user._id.toString(),
      passwordToken: token, // Send the token back to the frontend
    };
  }

  @Post('/local-signup')
  async addToWaitingList(@Body() createLocalDto: CreateLocalDto) {
    return await this.authService.addToWaitingList(createLocalDto);
  }
}
