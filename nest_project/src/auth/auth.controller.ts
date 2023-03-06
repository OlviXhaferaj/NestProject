import { Body, Get, Post, Req} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}
    // a private variable can only be accessed inside this class

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body() signUpDto: SignUpDto): Promise<{token:string}>{
        // the signupDto req body will be passed to the .signup funcion
        console.log(process.env.JWT_SECRET, 'this is the sercret key')
        return this.authService.signUp(signUpDto)
    }

    @UseGuards()
    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() loginDto: LoginDto): Promise<{token:string}>{
        
        return this.authService.login(loginDto)
    }

    @Get('/:id')
    findOne(@Body() userDto: UserDto) {
        return this.authService.findOne(userDto);
    }
    
}
