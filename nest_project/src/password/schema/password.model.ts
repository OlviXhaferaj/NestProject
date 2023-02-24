import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type PasswordDocument = HydratedDocument<Password>;

@Schema({
    timestamps:true
})

export class Password{

    @Prop()
    name:string

    @Prop()
    email:string

    @Prop({unique:true})
    token:string
}
export const PasswordSchema = SchemaFactory.createForClass(Password)