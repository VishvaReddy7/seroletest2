import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from './successfulpopdialog/successfulpopdialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { Subjects } from './interfaces/subjectsInterface';
import { Admin } from './interfaces/adminInterface';
import { Teachers } from './interfaces/teachersInterface';
import { Students } from './interfaces/studentsInterface';
import { Store } from '@ngxs/store';



@Injectable({
  providedIn: 'root'
})
export class RestService {

  
  role: string | undefined;
  loggedInPersonUserName: string | undefined;
  loggedInPersonEmail: string | undefined;
  loggedInPersonRole: string | undefined;
  userExist: string | undefined;
  loggedInUserName: string | undefined;
  editPersonRole: string | undefined;

  
  
  

  constructor(private httpClient: HttpClient, public readonly dialog: MatDialog, private store: Store) { }
  
  getTeacherData() : Observable<Teachers[]> {
     return this.httpClient.get<Teachers[]>(`${environment.apiUrl}teachers`);
  }

  getStudentData() : Observable<Students[]> {
    return this.httpClient.get<Students[]>(`${environment.apiUrl}students`);
  }

  getAdminData() : Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(`${environment.apiUrl}admin`);
  }

  getSubjectsData() : Observable<Subjects[]> {
    return this.httpClient.get<Subjects[]>(`${environment.apiUrl}subjects`);
  }

  getLoggedInPersonData() : Observable<object> {
    return this.httpClient.get(`${environment.apiUrl}${this.loggedInPersonRole}/?userName=${this.loggedInPersonUserName}`);
  }


  signUp(data: Students | Teachers) : Observable<Students | Teachers> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.httpClient.post<Students | Teachers>(`${environment.apiUrl}${this.role}`, data, options);
  }


  save(data: Students | Teachers | Admin) : Observable<Students | Teachers | Admin> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.httpClient.put<Students | Teachers | Admin>(`${environment.apiUrl}${this.editPersonRole}/${data.id}`, data, options);
    
  }

  delete(data: Teachers) : Observable<Teachers> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    let dataoptions={
    "activitystatus":data.activitystatus
    };
     return this.httpClient.patch<Teachers>(`${environment.apiUrl}teachers/${data.id}`, dataoptions);
  }

  push(data: Subjects) : Observable<Subjects> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.httpClient.post<Subjects>(`${environment.apiUrl}subjects`, data, options);
  }

  subjectToggle(data: Subjects) : Observable<Subjects>{
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    let dataoptions={
      "activitystatus": data.activitystatus,
      "isActive": data.isActive
    }
    return this.httpClient.patch<Subjects>(`${environment.apiUrl}subjects/${data.id}`, dataoptions);
  }

  

  openDialog(): Observable<any> {
    
    const dialogRef = this.dialog.open(SuccessfulpopdialogComponent, {
      height: '190px',
      width: '290px',
      panelClass: 'confirm-dialog-container',
    });
    console.log()
    return dialogRef.afterClosed();
    }

    
}
