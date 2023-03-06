import {Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {InjectModel} from '@nestjs/mongoose';
import {Student, StudentDocument} from './students.model'


@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>){}


  async create(createStudentDto: CreateStudentDto) {
    const createdStudent = new this.studentModel(createStudentDto);
    try{
      return await createdStudent.save()
    }
    catch(error) {
      console.log(error)
    }
  }

  async findAll():Promise <Student[]> {
    return this.studentModel.find().exec();
    
  }

  async findOne(id: string):Promise <Student> {
    return this.studentModel.findOne({_id:id})
    .populate({path:'subjects_id', select:'subjects'});
  }

  async update(id: string, updateStudentDto: UpdateStudentDto):Promise <Student>  {
    return this.studentModel.findOneAndUpdate(
      {_id: id}, updateStudentDto, {new:true});
  }
  remove(id: string) {
    return this.studentModel.findOneAndDelete({_id:id});
  }
}
