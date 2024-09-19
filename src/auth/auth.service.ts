import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import * as sendgridTransport from 'nodemailer-sendgrid-transport';
import { CreateLocalDto } from './dto/local-signup.dto';
import { WaitingLocal } from './schemas/waiting.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private usermodel: Model<User>,
        private jwtService: JwtService,
        @InjectModel(WaitingLocal.name)
        private waitingUserModel: Model<WaitingLocal>,
    ) {}
    async signUp(signUpDto: SignUpDto): Promise<{ token: string; userId: string }> {
      const { name, email, password, role } = signUpDto;
    
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
    
      // Create the user
      const user = await this.usermodel.create({
        name,
        email,
        password: hashedPassword,
        role
      });
    
      // Generate JWT token
      const token = this.jwtService.sign({ id: user._id });
    
      // Return both token and user ID
      return { token, userId: user._id.toString() };
    }
    
    async login(loginDto: LoginDto): Promise<{ token: string; userId: string }> {
      const { email, password } = loginDto;
    
      // Find the user by email
      const user = await this.usermodel.findOne({ email });
    
      if (!user) {
        console.log('Invalid email');
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Invalid email',
          error: 'Unauthorized',
        });
      }
    
      // Compare password
      const isPassCorrect = await bcrypt.compare(password, user.password);
    
      if (!isPassCorrect) {
        console.log('Incorrect password');
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Invalid password',
          error: 'Unauthorized',
        });
      }
    
      // Generate JWT token
      const token = this.jwtService.sign({ id: user._id });
    
      // Return both token and user ID
      return { token, userId: user._id.toString() };
    }
    
async sendResetLink(email: string): Promise<void> {
    const token = crypto.randomBytes(32).toString('hex');

    const user = await this.usermodel.findOne({ email });
    if (!user) {
      throw new NotFoundException({
        statusCode: 401,
        message: 'Not account with this email',
        error: 'Unauthorized',
      });
    }

    user.resetToken = token;
    user.resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour expiration
    await user.save();

    // Send the reset email
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
          api_key: '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'
        }
      }));

    const mailOptions = {
      to: email,
      from: 'pairmemoldova@gmail.com',
      subject: 'Password Reset',
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to change your password</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }

  async postNewPassword(newPasswordDto: NewPasswordDto): Promise<void> {
    const { passwordToken, newPassword, userId } = newPasswordDto;

    // Find the user with a valid reset token and not expired
    const user = await this.usermodel.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: new Date() },
      _id: userId,
    });

    if (!user) {
      throw new BadRequestException({
        statusCode: 401,
        message: 'Invalid token or no such user',
        error: 'Unauthorized',
      });;
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user password and reset token fields
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = undefined;

    // Save the updated user
    await user.save();
  }

  async findUserByResetToken(token: string): Promise<User | null> {
    const user = await this.usermodel.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: new Date() }, // Token must be valid and not expired
    });

    if (!user) {
      throw new NotFoundException('Invalid token or token has expired.');
    }

    return user;
  }

  async addToWaitingList(createUserDto: CreateLocalDto): Promise<WaitingLocal> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const waitingUser = new this.waitingUserModel({
      ...createUserDto,
      password: hashedPassword,
      status: 'pending',
    });
    return await waitingUser.save();
  }


}
