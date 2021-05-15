import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  subjects: any;
  studentData: any;
  
  

  constructor(private restService: RestService, 
    private router: Router,
    public  readonly dialog: MatDialog
   ) { }

  ngOnInit(): void {
    
     this.restService.getStudentData().subscribe((response) => {
      this.studentData = response;
    });
    
    this.restService.getSubjectsData().subscribe((response) => {
      this.subjects = response;
    });
  }

  displayedColumns: string[] = ['firstName',  'lastName', 'subjects', 'gender', 'phoneNumber', 'userName', 'actions' ];
  

}
