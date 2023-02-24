import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Student, StudentSchema} from './students.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
    // forFeature() method defines which model should be registered 
    name: Student.name,
    schema: StudentSchema 
  }])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
