import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {MongooseModule} from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwTStrategy } from './jwt.strategy';
import { LocalSchema } from './schemas/local.schema';
import { WaitingUserSchema } from './schemas/waiting.schema';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>{
        return{
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {expiresIn:config.get<string | number>('JWT_EXPIRE')}
        }
      }
    }),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Local', schema: LocalSchema}]),
    MongooseModule.forFeature([{name: 'WaitingLocal', schema: WaitingUserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwTStrategy],
  exports: [JwTStrategy, PassportModule],
})
export class AuthModule {}
