import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.css']
})
export class TeachersListComponent implements OnInit {

  subjects: any;
  teacherData: any;

  constructor(private restService: RestService, 
    private router: Router,
    public  readonly dialog: MatDialog) { }

  ngOnInit(): void {

    this.restService.getTeacherData().subscribe((response) => {
      this.teacherData = response;
    });
    
    this.restService.getSubjectsData().subscribe((response) => {
      this.subjects = response;
    });

  }

  displayedColumns: string[] = ['firstName',  'lastName', 'subjects', 'gender', 'phoneNumber', 'userName', 'actions' ];

}
