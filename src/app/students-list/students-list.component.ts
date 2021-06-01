import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';
import { first, filter} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { StudentsignupComponent } from '../studentsignup/studentsignup.component'
import { Students } from '../interfaces/studentsInterface';
import { Subjects } from '../interfaces/subjectsInterface';




@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  subjectsData: Array<Subjects> = [];
  studentData: Array<Students> = [];
  subscription: Subscription | undefined;
  userDetails: Students | undefined;
  
  

  constructor(private restService: RestService, 
    private router: Router,
    private dialog: MatDialog
   ) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getStudentData();
    this.getSubjectsData();
  }

  displayedColumns: string[] = ['firstName',  'lastName', 'subjects', 'gender', 'phoneNumber', 'userName', 'actions' ];

  editForm(userName: string) : void {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      console.log("this selected employee ID =>", userName);
      this.userDetails = this.studentData.find(
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
  openDialogEdit(): void {
    const dialogRef : MatDialogRef<StudentEditComponent, Students> = this.dialog.open(StudentEditComponent, {
       data: {
         userDetails: this.userDetails,
         disableClose: true
       }
    });
    dialogRef.afterClosed().pipe(
      first()
    ).subscribe((item: any) => {
      this.getStudentData();
    })
       
      
  };

    addStudent(): void  {
      const dialogRef: MatDialogRef<StudentsignupComponent> = this.dialog.open(StudentsignupComponent);
      dialogRef.afterClosed().pipe(
        first()
      ).subscribe((item: Students) => {
        this.getStudentData();
      })

    }

    getStudentData(): void {
      this.subscription=this.restService.getStudentData().pipe(
        first()
      ).subscribe((response: Students[]) => {
        this.studentData = response;
      });

    }

    getSubjectsData() : void {
      this.restService.getSubjectsData().pipe(
        filter((subject: Subjects[]) => !!subject),
        first()
  
      ).subscribe((response: Subjects[]) => {
        this.subjectsData = response;
      });
    } 

}
