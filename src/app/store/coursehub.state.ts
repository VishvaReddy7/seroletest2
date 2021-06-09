import { State, Action, StateContext, Selector, Actions } from '@ngxs/store';
import { Data } from './coursehub.model';
import { addUser, setUser, updateUser, setUpdatedUser, getStudentData, setStudentData, getTeacherData, setTeacherData, getSubjectsData, setSubjectsData, getAdminData, setAdminData } from './coursehub.action';
import { RestService } from '../rest.service';
import { switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from '../interfaces/studentsInterface';
import { Admin } from '../interfaces/adminInterface';
import { Teachers } from '../interfaces/teachersInterface';


@State<Data>({
  name: 'coursehubdata',
  defaults: {
    signUpData: [],
    updateData: [],
    studentData: [],
    teacherData: [],
    subjectsData: [],
    adminData: [],
  }
})
@Injectable()
export class DataState {
  static setTeacherData(setTeacherData: any) {
      throw new Error('Method not implemented.');
  }
  constructor(private restService: RestService, private httpClient: HttpClient) { }

  @Selector()
  static getSignUpData(state: Data) {
    return state.signUpData;
  }

  @Selector()
  static getUpdatedData(state: Data) {
    return state.updateData;
  }

  @Selector()
  static getStudentData(state: Data) {
    return state.studentData;
  }

  @Selector()
  static getTeacherData(state: Data) {
    return state.teacherData;
  }

  @Selector()
  static getSubjectsData(state: Data) {
    return state.subjectsData;
  }

  @Selector()
  static getAdminData(state: Data) {
    return state.adminData;
  }


  @Action(addUser)
  loadContactDetailAction(
    ctx: StateContext<Data>,
    action: addUser
  ): Actions {
    ctx.patchState({
      signUpData: undefined,

    });
    return this.restService.signUp(action.payload)
      .pipe(
        switchMap((response: any) =>
          ctx.dispatch(new setUser(response))
        ),

      );
  }

  @Action(updateUser)
  updateContactDetailAction(
    ctx: StateContext<Data>,
    action: updateUser
  ): Actions {
    ctx.patchState({
      updateData: undefined,
    });
    return this.restService.save(action.payload)
      .pipe(
        switchMap((response: any) =>
          ctx.dispatch(new setUpdatedUser(response))
        ),
      );

  }

  @Action(getStudentData)
  getStudentsDataAction(
    ctx: StateContext<Data>,
    action: getStudentData
  ): Actions {
    ctx.patchState({
      studentData: undefined,
    });
    return this.restService.getStudentData()
      .pipe(
        switchMap((response: Students[]) =>
          ctx.dispatch(new setStudentData(response))
        ),
      );
  }

  @Action(getTeacherData)
  getTeachersDataAction(
    ctx: StateContext<Data>,
    action: getTeacherData
  ): Actions {
    ctx.patchState({
      teacherData: undefined
    });
    return this.restService.getTeacherData()
    .pipe(
      switchMap((response: any) =>
      ctx.dispatch(new setTeacherData(response))
      ),
    );
  }

  @Action(getSubjectsData)
  getSubjectsDataAction(
    ctx: StateContext<Data>,
    action: getSubjectsData
  ): Actions {
    ctx.patchState({
      subjectsData: undefined
    });
    return this.restService.getSubjectsData()
    .pipe(
      switchMap((response: any) =>
      ctx.dispatch(new setSubjectsData(response))
      ),
    );
  }

  @Action(getAdminData)
  getAdminDataAction(
    ctx: StateContext<Data>,
    action: getAdminData
  ): Actions {
    ctx.patchState({
      adminData: undefined
    });
    return this.restService.getAdminData()
    .pipe(
      switchMap((response: any) => 
      ctx.dispatch(new setAdminData(response))
      ),
    );
  }

  @Action(setUser)
  setContactDetailAction(
    ctx: StateContext<Data>,
    action: setUser
  ): void {
    ctx.patchState({
      signUpData: action.response,
    });
  }

  @Action(setUpdatedUser)
  setUpdatedContactDetailAction(
    ctx: StateContext<Data>,
    action: setUpdatedUser
  ): void {
    ctx.patchState({
      updateData: action.response,
    });
  }

  @Action(setStudentData)
  setStudentDataAction(
    ctx: StateContext<Data>,
    action: setStudentData
  ): void {
    ctx.patchState({
      studentData: action.response,
    });
  }

  @Action(setTeacherData)
  setTeacherDataAction(
    ctx: StateContext<Data>,
    action: setTeacherData
  ): void {
    ctx.patchState({
      teacherData: action.response,
    });
  }

  @Action(setSubjectsData)
  setSubjectsDataAction(
    ctx: StateContext<Data>,
    action: setSubjectsData
  ): void {
    ctx.patchState({
      subjectsData: action.response,
    });
  }

  @Action(setAdminData)
  setAdminDataAction(
    ctx: StateContext<Data>,
    action: setAdminData
  ): void {
    ctx.patchState({
      adminData: action.response,
    });
  }

}