import {IsEmail, IsNotEmpty, IsString,MinLength} from 'class-validator';
import { UserRoles } from '../user-roles';

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name:string

    @IsNotEmpty()
    @IsEmail({}, {message: 'Please enter a correct email'})
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string
}