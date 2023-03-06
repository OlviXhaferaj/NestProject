import { RolesBuilder } from 'nest-access-control';

// Here we define the possible roles
export enum UserRoles {
    Admin = 'Admin',
    Reader = 'Reader'
}

export const roles: RolesBuilder = new RolesBuilder(); 

// here we grant the users with different roles, different abilities
roles.grant(UserRoles.Reader)
    // The readAny method allows users with the reader ability 
    // to read any information. But he has only the ability to read
    .readAny(['students'])
    // The read Own grands the reader 
    // the ability to view only the students he has created
    // .readOwn([])

    // 
    .grant(UserRoles.Admin)
    // the method .extend
    // gives the admin the premissions that the user
    // with the role of reader has
    .extend(UserRoles.Reader)
    .update(['students', 'subs'])
    .create(['students', 'subs'])
    .delete(['students', 'subs'])
