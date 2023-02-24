// import { MailerService } from '@nestjs-modules/mailer/dist';
import { MailerService } from '@nestjs-modules/mailer';
import { Body, NotFoundException, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PasswordDto } from './dto/password.dto';
import { PasswordService } from './password.service';
import { Password } from './schema/password.model';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcryptjs'

@Controller('api') //http:localhost:8000/api/forgot
export class PasswordController {
    constructor(
        private readonly passwordService: PasswordService,
        private mailerService: MailerService,
        private authService: AuthService
        ) {}


    @Post('forgot')
    async forgot(
        @Body() passwordDto:PasswordDto
    ) {
        // this is the function that will generate a random token
        const token = Math.random().toString(20).substring(2,12);
        console.log(token);

        await this.passwordService.create({
            name: passwordDto.name,
            email: passwordDto.email,
            token: token,
        });

        const url = `http://localhost:3000/reset/${token}`;
        // let transporter = this.mailerService.addTransporter({
        //     service:
        // })

        await this.mailerService.sendMail({
            
            to: passwordDto.email,
            subject: 'Reset your password!',
            html: `Click <a href="${url}">Here</a> to reset your password`
        });
        return {
            message: 'Please check your email!'
        }
    }

    @Post('reset')
    async reset(
        @Body('token') token:string,
        @Body('password')password: string 
    ) {
        const passwordReset: any = await this.passwordService.findOne({token});

        const user = await this.authService.findOne({email: passwordReset.email})
        console.log(user, 'this is the user');
        console.log(user.email, 'this is the email');
        // console.log(user._id, 'this is the email');
        // return user
        

        if(!user){
            throw new NotFoundException('User not found!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.authService.update(user.email, {password:hashedPassword})
        return {
            message: 'Success!'
        }
    }
}
