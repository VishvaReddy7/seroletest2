import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminEditComponent } from '../admin-edit/admin-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RestService } from '../rest.service';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { first, filter} from 'rxjs/operators';
import { Students } from '../interfaces/studentsInterface';
import { Teachers } from '../interfaces/teachersInterface';
import { Admin } from '../interfaces/adminInterface';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  

  myProfileData: any;
  arrayOfKeys: any;
  editData: any;
  

  constructor(private restService: RestService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
     this.getLoggedInPersonData();
  }

  editMyProfile() : void {
    if(this.restService.loggedInPersonRole === 'students') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.openStudentDialogEdit();
      }
      else{
      }
     });
    }
    else if(this.restService.loggedInPersonRole === 'teachers') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.openTeacherDialogEdit();
      }
      else{
      }
     });
    }
    else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.openAdminDialogEdit();
      }
      else{
      }
     });

    }
    
  }

  openStudentDialogEdit(): void {
    const dialogRef = this.dialog.open(StudentEditComponent, {
       data: {
        userDetails: this.editData[0],
        //  disableClose: true
       }
    });
    dialogRef.afterClosed().pipe(
      first()
    ).subscribe((item : Students[]) => {
      this.getLoggedInPersonData();
    })
  }

  openTeacherDialogEdit(): void {
    const dialogRef = this.dialog.open(TeacherEditComponent, {
       data: {
         userDetails: this.editData[0],
        //  disableClose: true
       }
    });
    dialogRef.afterClosed().pipe(
      first()
    ).subscribe((item : Teachers[]) => {
      this.getLoggedInPersonData();
    })
  }
  
  openAdminDialogEdit(): void {
    const dialogRef = this.dialog.open(AdminEditComponent, {
       data: {
         userDetails: this.editData[0],
        //  disableClose: true
       }
    });
    dialogRef.afterClosed().pipe(
      first()
    ).subscribe((item : Admin[]) => {
      this.getLoggedInPersonData();
    })
  }

  getLoggedInPersonData() : void {
    this.restService.getLoggedInPersonData().subscribe((response: any) => {
      this.myProfileData = response;
      this.editData = response;
      console.log(this.editData[0]);
      this.arrayOfKeys = Object.keys(this.myProfileData[0]);
    });
  }
  


  
  
  
  

}
