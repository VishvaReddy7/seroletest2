import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TeacherEditComponent } from '../teacher-edit/teacher-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TeachersignupComponent } from '../teachersignup/teachersignup.component';
import { first } from 'rxjs/operators';
import { Teachers } from '../interfaces/teachersInterface';
import { Subjects } from '../interfaces/subjectsInterface';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  subjectsData: Array<Subjects> = [];
  teacherData: Array<Teachers> = [];
  userDetails: Teachers | undefined;
  deleteIDPerson: any;
  
  

  constructor(private restService: RestService, 
    private router: Router,
    public  readonly dialog: MatDialog) { }

  ngOnInit(): void {
     this.getTeacherData();
     this.getSubjectsData();
  }

  displayedColumns: string[] = ['firstName',  'lastName', 'subjects', 'gender', 'phoneNumber', 'userName', 'activitystatus', 'actions' ];

  editForm(userName: string) : void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      console.log("this selected employee ID =>", userName);
      this.userDetails = this.teacherData.find(
        (o: { userName: string }) => o.userName === userName
      );
      console.log("selected user Details=>",this.userDetails);

      this.restService.userExist = userName;
      this.openDialogEdit();
      
    }
    else{
    }
   });
  }
  
  delete(userName: string) : void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteIDPerson = this.teacherData.find((o: { userName: string; }) => o.userName === userName);
      
        console.log("DP",this.deleteIDPerson)
        this.deleteIDPerson.activitystatus = 'InActive';
          
        let data = this.deleteIDPerson?.activitystatus;
        this.restService.delete(this.deleteIDPerson).subscribe((response) => {
          console.log(response);
        });
        this.getTeacherData();
      }
      else{
      }
    });
  }
  
  openDialogEdit(): void {
    const dialogRef : MatDialogRef<TeacherEditComponent, Teachers> = this.dialog.open(TeacherEditComponent, {
       data: {
         userDetails: this.userDetails,
         disableClose: true
       }
    });
    dialogRef.afterClosed().pipe(
      first()
    ).subscribe((item: any) => {
      this.getTeacherData();
    })
       
      
  };

    addTeacher() : void {
      const dialogRef = this.dialog.open(TeachersignupComponent);
      dialogRef.afterClosed().pipe(
        first()
      ).subscribe((item: Teachers) => {
        this.getTeacherData();
      })

    }

    getTeacherData() : void {
      this.restService.getTeacherData().pipe(
        first()
      ).subscribe((response: Teachers[]) => {
        this.teacherData = response;
      });
    }

    getSubjectsData() : void{
      this.restService.getSubjectsData().pipe(
        first()
      ).subscribe((response: Subjects[]) => {
        this.subjectsData = response;
      });
    }

    
    
    

}
