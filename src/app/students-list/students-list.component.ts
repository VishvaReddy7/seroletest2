import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { first, filter} from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  subjects: any;
  studentData: any;
  subscription: Subscription | undefined;
  
  

  constructor(private restService: RestService, 
    private router: Router,
    public  readonly dialog: MatDialog
   ) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    
    this.subscription=this.restService.getStudentData().subscribe((response) => {
      this.studentData = response;
    });
    
    this.restService.getSubjectsData().pipe(
      filter((subject: any) => !!subject),
      first()

    ).subscribe((response) => {
      this.subjects = response;
    });
  }

  displayedColumns: string[] = ['firstName',  'lastName', 'subjects', 'gender', 'phoneNumber', 'userName', 'actions' ];

  editForm(userName: any) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((result: boolean) => {
    if (result) {
      console.log("this selected employee ID =>", userName);
      this.restService.userExist = userName;
      const dialogRef = this.dialog.open(EditPopupComponent);
    }
    else{
    }
   });
  }  
  

}
