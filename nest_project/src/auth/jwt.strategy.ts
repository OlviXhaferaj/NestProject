import {Injectable, UnauthorizedException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.schema";
import { Model } from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectModel(User.name)
    private userModel:Model<User>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload:any){
        const{id} =payload;

        const user = await this.userModel.findById(id);

        if(!user){
            throw new UnauthorizedException('Log in first to access this endpoint')
        }

        return user; 

    }
}


