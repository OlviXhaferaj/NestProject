// import {Schema , Prop, SchemaFactory} from '@nestjs/mongoose';
// import {HydratedDocument} from 'mongoose';

// export type SubjectsDocument = HydratedDocument<Subjects>;


// @Schema({
//     timestamps:true
// })
// // The @Schema() decorator marks a schema definition
// export class Subjects{
//     @Prop({type:Object})
//     subjects:{
//         maths: {
//             type:string,
//             enum: ['A','B','C','D','E','F']
//         }
//         english: {
//             type:string,
//             enum: ['A','B','C','D','E','F']
//         }
//         physics: {
//             type:string,
//             enum: ['A','B','C','D','E','F']
//         }
//         chemistry: {
//             type:string,
//             enum: ['A','B','C','D','E','F']
//         }
//         history: {
//             type:string,
//             enum: ['A','B','C','D','E','F']
//         }
//         sports: {
//             type:string,
//             enum: ['A','B','C','D','E','F']
//         }
//     }
// }


// export const SubjectsSchema = SchemaFactory.createForClass(Subjects)