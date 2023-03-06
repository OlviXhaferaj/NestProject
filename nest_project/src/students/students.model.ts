import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import * as mongoose from 'mongoose';
import { Subs } from 'src/subs/schema/subs.model';

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

    // Ref ObjectId
    // @Prop({type:Object})
    // subjects: {type :mongoose.Schema.Types.ObjectId, ref: 'Subjects' };
    @Prop({
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Subs'
        ,
        nullable:true
    })
    subjects_id: Subs
}


export const StudentSchema = SchemaFactory.createForClass(Student)