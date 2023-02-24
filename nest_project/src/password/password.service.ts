import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Password, PasswordDocument} from './schema/password.model';
import { Model } from 'mongoose';
import { PasswordDto } from './dto/password.dto';

@Injectable()
export class PasswordService {
    constructor(@InjectModel(Password.name) private  passwordModel: Model<PasswordDocument>){

    }

    async create(passwordDto:PasswordDto){
        const createdPass = new this.passwordModel(passwordDto);
            try{
                await createdPass.save()
            }
            catch(error) {
                console.log(error)
            }
    }

    // //
    async findOne(data: any):Promise <Password> {
        return this.passwordModel.findOne(data);
    }
}
