import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showStudents: boolean = false;
  showTeachers: boolean = false;
  showMyProfile: boolean = false;
  showSubjects: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showStudentList() {
      this.showStudents = true;
      this.showTeachers = false;
      this.showMyProfile = false;
      this.showSubjects = false;
  }

  showTeacherList() {
    this.showTeachers = true;
    this.showStudents = false;
    this.showMyProfile = false;
    this.showSubjects = false;
  }

  showMyProfileData() {
      this.showStudents = false;
      this.showTeachers = false;
      this.showMyProfile = true;
      this.showSubjects = false;
  }

  showSubjectsData() {
    this.showStudents = false;
    this.showTeachers = false;
    this.showMyProfile = false;
    this.showSubjects = true;
  }

}
