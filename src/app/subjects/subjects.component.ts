import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SubjectAddComponent } from '../subject-add/subject-add.component';
import { first } from 'rxjs/operators';
import { Subjects } from '../interfaces/subjectsInterface';


@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjectsData: Array<Subjects> = [];
  deleteIDSubject: any ;


  constructor(private restService: RestService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
       this.getSubjectsData();
  }

  displayedColumns: string[] = ['subjects', 'actions'];

  addSubjectPopup() : void {
    const dialogRef: MatDialogRef<SubjectAddComponent> = this.dialog.open(SubjectAddComponent, {
      height: '400px',
      width: '400px',

    });
    dialogRef.afterClosed().pipe(
      first()
    ).subscribe((item: Subjects[]) => {
      this.getSubjectsData();
    })

  }

  getSubjectsData() : void {
    this.restService.getSubjectsData().pipe(
      first()
    ).subscribe((response: Subjects[]) => {
      this.subjectsData = response;
  })
  }

  changed(name: string) {
    console.log(name);
    this.deleteIDSubject = this.subjectsData.find((o: { name: string; }) => o.name === name);
    console.log(this.deleteIDSubject);
    if(this.deleteIDSubject.isActive) {
      this.deleteIDSubject.activitystatus = "Active";
    }
    else {
      this.deleteIDSubject.activitystatus = "InActive";
    }
    this.restService.subjectToggle(this.deleteIDSubject).subscribe((response: Subjects) => {
      console.log(response);
    });
   
  }

  

}
