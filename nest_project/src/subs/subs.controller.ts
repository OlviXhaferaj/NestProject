import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubsService } from './subs.service';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseRoles, ACGuard} from 'nest-access-control';

@Controller('subs')
export class SubsController {
  constructor(private readonly subsService: SubsService) {}

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    possession:'any',
    action:'create',
    resource: 'subs'
  })
  create(@Body() createSubDto: CreateSubDto) {
    return this.subsService.create(createSubDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.subsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.subsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    possession:'any',
    action:'update',
    resource: 'subs'
  })
  update(@Param('id') id: string, @Body() updateSubDto: UpdateSubDto) {
    return this.subsService.update(id, updateSubDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    possession:'any',
    action:'delete',
    resource: 'subs'
  })
  remove(@Param('id') id: string) {
    return this.subsService.remove(id);
  }
}
