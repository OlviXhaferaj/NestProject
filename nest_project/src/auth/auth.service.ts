import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {User} from './user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<User>,
        private jwtService: JwtService
        // assign the jwt token to the user
        ){
    }

    
    async signUp(signUpDto:SignUpDto): Promise<{token: string}> {
        const {name, email, password} = signUpDto

        const hashedPassword = await bcrypt.hash(password, 10)
        // bcrypt encrypts the password. 10 is the salt (how many times the password will be hashed)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = this.jwtService.sign({id:user._id, name:user.name})
        // .sign function creates the jwtToken and we sign in the payload. 
        // which is the data we want to save to the token
        return {token}
    }

    async login(loginDto:LoginDto): Promise<{token:string}> {
        const {email, password} = loginDto;

        const user = await this.userModel.findOne({email});
        console.log(user.roles, 'this is roles');
        
        // find if the user who wants to log in exists or not
        if(!user.password) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        
        if(!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({id:user._id, name:user.name})
        return {token}
    }



    async findOne(condition:any): Promise<User>{
        return this.userModel.findOne(condition);
    }

    async update(email: string, data:any):Promise <User>  {
        return this.userModel.findOneAndUpdate(
        {email: email}, data, {new:true});
    }
}

