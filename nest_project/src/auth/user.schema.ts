import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from './user-roles';

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

    @Prop({type:String, enum: UserRoles, default: UserRoles.Reader})
    // we need to call the property 
    // 'roles' 
    // because the roles guard expects this property in the database
    roles: UserRoles
}


export const UserSchema = SchemaFactory.createForClass(User)