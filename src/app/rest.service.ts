import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from './successfulpopdialog/successfulpopdialog.component';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  teacherData: any;
  role: any;
  

  constructor(private httpClient: HttpClient, public readonly dialog: MatDialog) { }
  
  getTeacherData() {
     return this.httpClient.get(`${environment.apiUrl}teachers`);
  }

  getStudentData() {
    return this.httpClient.get(`${environment.apiUrl}students`);
  }

  getAdminData() {
    return this.httpClient.get(`${environment.apiUrl}admin`);
  }

  getSubjectsData() {
    return this.httpClient.get(`${environment.apiUrl}subjects`);
  }


  signUp(data: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.httpClient.post(`${environment.apiUrl}`+this.role, data, options);
  }

  openDialog(): Observable<any> {
    // this.passingName = userName;
    const dialogRef = this.dialog.open(SuccessfulpopdialogComponent, {
      height: '190px',
      width: '290px',
      panelClass: 'confirm-dialog-container',
    });
    console.log()
    return dialogRef.afterClosed();
    };

}
