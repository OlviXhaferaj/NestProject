import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import * as mongoose from 'mongoose';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {


    @IsNotEmpty({message: "Name field should not be empty"})
    @MinLength(3, {message: 'Name should be at least 3 characters'})
    name:string;

    @IsNotEmpty({message: "Last Name field should not be empty"})
    @MinLength(4, {message: 'Last name should be at least 4 characters'})
    lastName: string;

    subjects_id: string
}
