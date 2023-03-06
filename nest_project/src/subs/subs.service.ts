import { Injectable } from '@nestjs/common';
import { CreateSubDto } from './dto/create-sub.dto';
import { UpdateSubDto } from './dto/update-sub.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subs, SubsDocument } from './schema/subs.model';

@Injectable()
export class SubsService {
  constructor(@InjectModel(Subs.name) private subsModel: Model<SubsDocument>){}

  async create(createSubDto: CreateSubDto) {
    const createdSubs = new this.subsModel(createSubDto);
    try{
      return await createdSubs.save();
    }
    catch(err){
      console.log(err);
    }
  }

  findAll() {
    return this.subsModel.find().exec();
  }

  findOne(id: string) {
    return this.subsModel.findOne({ _id:id })
  }

  update(id: string, updateSubDto: UpdateSubDto) {
    return this.subsModel.findOneAndUpdate({_id: id}, updateSubDto, {new:true});
  }

  remove(id: string) {
    return this.subsModel.findOneAndDelete({_id: id});
  }
}
