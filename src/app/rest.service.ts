import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from './successfulpopdialog/successfulpopdialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditPopupComponent } from './edit-popup/edit-popup.component';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  teacherData: any;
  role: any;
  loggedInPersonEmail: any;
  loggedInPersonRole: any;
  userExist: any;
  
  
  

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

  getLoggedInPersonData() {
    return this.httpClient.get(`${environment.apiUrl}`+this.loggedInPersonRole+`/?email=`+this.loggedInPersonEmail);
  }


  signUp(data: any) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.httpClient.post(`${environment.apiUrl}`+this.role, data, options);
  }

  openDialog(): Observable<any> {
    
    const dialogRef = this.dialog.open(SuccessfulpopdialogComponent, {
      height: '190px',
      width: '290px',
      panelClass: 'confirm-dialog-container',
    });
    console.log()
    return dialogRef.afterClosed();
    };

    openDialog2(): Observable<any> {
      
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        height: '190px',
        width: '290px',
        panelClass: 'confirm-dialog-container',
        disableClose: true
      });
      console.log()
      return dialogRef.afterClosed();
      };

      openDialogEdit(): Observable<any> {
      
        const dialogRef = this.dialog.open(EditPopupComponent, {
          height: 'auto',
          width: 'auto',
          
          // panelClass: 'confirm-dialog-container',
          disableClose: true
        });
        console.log()
        return dialogRef.afterClosed();
        };

      

}
