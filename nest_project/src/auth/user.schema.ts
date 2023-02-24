import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps:true
})
export class User {
    @Prop()
    name: string

    @Prop({unique:[true, 'Dubpicate email entered']})
    // In the prop decorater, unique property means that there cant be 
    // more than 1 user with the same email 
    email: string

    @Prop()
    password:string
}


export const UserSchema = SchemaFactory.createForClass(User)