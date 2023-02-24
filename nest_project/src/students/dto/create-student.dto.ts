import { IsNotEmpty } from "class-validator"

export class CreateStudentDto {

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    lastName: string
    
    @IsNotEmpty()
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
