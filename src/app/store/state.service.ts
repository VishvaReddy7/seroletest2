import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { addUser, getAdminData, getStudentData, getSubjectsData, getTeacherData, updateUser } from '../store/coursehub.action';
import { DataState } from '../store/coursehub.state';
import { Subjects } from '../interfaces/subjectsInterface';
import { Admin } from '../interfaces/adminInterface';
import { Teachers } from '../interfaces/teachersInterface';
import { Students } from '../interfaces/studentsInterface';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class StateService {

    constructor(private store: Store){ }

    signUp(payload: Students | Teachers) : void { 
        this.store.dispatch(new addUser(payload));
    }
    
    getSignUpData(): Observable<Students[] | Teachers[]> {
        return this.store.select(DataState.getSignUpData);
    }

    save(payload: Students | Teachers | Admin) : void {
        this.store.dispatch(new updateUser(payload));
    }

    getUpdatedData() {
        return this.store.select(DataState.getUpdatedData);
    }

    getStudentData() {
        return this.store.dispatch(new getStudentData);
    }

    getStudentsList() {
        return this.store.select(DataState.getStudentData);
    }

    getTeacherData() {
        return this.store.dispatch(new getTeacherData);
    }

    getTeachersList() {
        return this.store.select(DataState.getTeacherData);
    }

    getSubjectsData() {
        return this.store.dispatch(new getSubjectsData);
    }

    getSubjectsList() {
        return this.store.select(DataState.getSubjectsData);
    }

    getAdminData() {
        return this.store.dispatch(new getAdminData);
    }

    getAdminList() {
        return this.store.select(DataState.getAdminData);
    }

}
