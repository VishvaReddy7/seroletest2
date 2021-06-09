import { Students } from "src/app/interfaces/studentsInterface";
import { Teachers } from "src/app/interfaces/teachersInterface";
import { Admin } from "src/app/interfaces/adminInterface";


export enum Details{
   ADD_USER = '[User] Add',
   SET_USER = '[User] Set',
   UPDATE_USER = '[User] Update',
   SET_UPDATED_USER = '[User] SetUpdated',
   GET_STUDENTS_LIST = '[StudentsList] Get',
   SET_STUDENTS_LIST = '[StudentsList] Set',
   GET_TEACHERS_LIST = '[TeachersList] Get',
   SET_TEACHERS_LIST = '[TeachersList] Set',
   GET_SUBJECTS_LIST = '[SubjectsList] Get',
   SET_SUBJECTS_LIST = '[SubjectsList] Set',
   GET_ADMIN_LIST = '[AdminList] Get',
   SET_ADMIN_LIST = '[AdminList] Set'  
}


export class addUser {
    static readonly type : Details = 
                 Details.ADD_USER;
    constructor(public payload: Students | Teachers){}
}

export class setUser {
    static readonly type : Details = Details.SET_USER;
    constructor(readonly response: any) {}
}

export class updateUser {
    static readonly type : Details = Details.UPDATE_USER;
    constructor(public payload: any) {}
}

export class setUpdatedUser {
    static readonly type : Details = Details.SET_UPDATED_USER;
    constructor(readonly response: any) {}
}

export class getStudentData {
    static readonly type : Details = Details.GET_STUDENTS_LIST;
}

export class setStudentData {
    static readonly type : Details = Details.SET_STUDENTS_LIST;
    constructor(readonly response: Students[]) {}
}

export class getTeacherData {
    static readonly type : Details = Details.GET_TEACHERS_LIST;
}

export class setTeacherData {
    static readonly type : Details = Details.SET_TEACHERS_LIST;
    constructor(readonly response: any) {}
}

export class getSubjectsData {
    static readonly type : Details = Details.GET_SUBJECTS_LIST;
}

export class setSubjectsData {
    static readonly type : Details = Details.SET_SUBJECTS_LIST;
    constructor(readonly response: any) {}
}

export class getAdminData {
    static readonly type : Details = Details.GET_ADMIN_LIST;
}

export class setAdminData {
    static readonly type : Details = Details.SET_ADMIN_LIST;
    constructor(readonly response: any) {}
}

