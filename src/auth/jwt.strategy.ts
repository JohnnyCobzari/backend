import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Local } from "./schemas/local.schema";


@Injectable()
export class JwTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        @InjectModel(Local.name)
        private localModel: Model<Local>
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload) {
        const{ id } = payload;
        let user = await this.userModel.findById(id);

        if(!user) {
            user = await this.localModel.findById(id);
        }

        if(!user){
        throw new UnauthorizedException('Login first to acces')
        }
        return user;
    }
}