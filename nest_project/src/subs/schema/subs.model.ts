import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type SubsDocument = HydratedDocument<Subs>;

@Schema({timestamps: true})

export class Subs {
    @Prop({type:Object})
    subjects:{
        maths: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
        english: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
        physics: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
        chemistry: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
        history: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
        sports: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
    }
}

export const SubsSchema = SchemaFactory.createForClass(Subs)
