import { IsNotEmpty } from "class-validator";

export class PasswordDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    email:string

    @IsNotEmpty()
    token:string
}
