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

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private usermodel: Model<User>,
        private jwtService: JwtService
    ) {}
async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
    const{name, email, password} = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.usermodel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = this.jwtService.sign({id: user._id })

    return {token}

}
async login(loginDto:LoginDto): Promise<{token: string}> {
    const{ email, password} = loginDto;

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.usermodel.findOne({
        email
    })

    if(!user) {
        throw new UnauthorizedException('Invalid email')
    }

    const isPassCorect = await bcrypt.compare(password, user.password)

    if(!isPassCorect) {
        throw new UnauthorizedException('Invalid password')
    }
    const token = this.jwtService.sign({id: user._id })

    return {token}
}
async sendResetLink(email: string): Promise<void> {
    const token = crypto.randomBytes(32).toString('hex');

    const user = await this.usermodel.findOne({ email });
    if (!user) {
      throw new NotFoundException('No account with this email');
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
      throw new BadRequestException('Invalid token or user not found.');
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

}
