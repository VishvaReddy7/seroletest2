import { Teachers } from 'src/app/interfaces/teachersInterface';
import { Students } from '../interfaces/studentsInterface';
import { Admin } from '../interfaces/adminInterface';
import { Subjects } from '../interfaces/subjectsInterface';

export interface Data {
    signUpData: Students[] | Teachers[];
    updateData: Students[] | Teachers[] | Admin[];
    studentData: Students[];
    teacherData: Teachers[];
    subjectsData: Subjects[];
    adminData: Admin[];

}