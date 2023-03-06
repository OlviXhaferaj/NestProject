import { IsNotEmpty, MinLength } from "class-validator";
import * as mongoose from 'mongoose';

export class CreateStudentDto {

    @IsNotEmpty({message: "Name field should not be empty"})
    @MinLength(3, {message: 'Name should be at least 3 characters'})
    name: string

    @IsNotEmpty({message: "Last Name field should not be empty"})
    @MinLength(4, {message: 'Last name should be at least 4 characters'})
    lastName: string
    
    subjects_id: string
}
