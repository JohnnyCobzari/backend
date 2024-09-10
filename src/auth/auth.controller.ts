import { Controller, Post, Body ,Get,  BadRequestException,Param,
    HttpCode,
    NotFoundException,
    HttpStatus,} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ) {}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{token: string}> {
        return this.authService.signUp(signUpDto)
    } 

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{token: string}> {
        return this.authService.login(loginDto)
    } 
    @Post('reset-password')
    @HttpCode(HttpStatus.OK)
    async postReset(@Body('email') email: string) {
      try {
        await this.authService.sendResetLink(email);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }


  @Post('new-password')
  async postNewPassword(@Body() newPasswordDto: NewPasswordDto): Promise<{ message: string }> {
    await this.authService.postNewPassword(newPasswordDto);
    return { message: 'Password updated successfully' };
  }

  @Get('reset/:token')
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
}
