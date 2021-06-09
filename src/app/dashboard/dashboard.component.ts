import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showStudents: boolean = false;
  showTeachers: boolean = false;
  showSubjects: boolean = false;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.displaySideNav();
  }

  displaySideNav() : void {
    if(this.restService.loggedInPersonRole === 'students') {
      this.showStudents = false;
      this.showTeachers = false;
      this.showSubjects = false;
    }
    else if(this.restService.loggedInPersonRole === 'teachers') {
      this.showStudents = true;
      this.showTeachers = false;
      this.showSubjects = false;
    }
    else {
      this.showStudents = true;
      this.showTeachers = true;
      this.showSubjects = true;
    }
  }
  
}
