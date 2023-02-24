import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;


@Schema({
    timestamps:true
})
// The @Schema() decorator marks a schema definition
export class Student{
    @Prop()
    // The @Prop decorator defines the properties 
    name: String

    @Prop()
    lastName: String

    @Prop({type:Object})
    subjects:{
        maths: {
            type:string,
            enum: ['A','B','C','D','E','F']
        },
        english: {
            type:string,
            enum: ['A','B','C','D','E','F']
        },
        physics: {
            type:string,
            enum: ['A','B','C','D','E','F']
        },
        chemistry: {
            type:string,
            enum: ['A','B','C','D','E','F']
        },
        history: {
            type:string,
            enum: ['A','B','C','D','E','F']
        },
        sports: {
            type:string,
            enum: ['A','B','C','D','E','F']
        }
    
    } 
}


export const StudentSchema = SchemaFactory.createForClass(Student)