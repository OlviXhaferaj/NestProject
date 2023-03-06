import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoles, ACGuard} from 'nest-access-control';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    possession:'any',
    action:'create',
    resource: 'students'
  })
  create(@Body() createStudentDto: CreateStudentDto) {

    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @UseGuards(AuthGuard())

  findAll() {
    return this.studentsService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    possession:'any',
    action:'update',
    resource: 'students'
  })
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update( id, updateStudentDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    possession:'any',
    action:'delete',
    resource: 'students'
  })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
