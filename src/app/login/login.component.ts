import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { StateService } from '../store/state.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from '../successfulpopdialog/successfulpopdialog.component';
import { first, skipWhile } from 'rxjs/operators';
import { Teachers } from '../interfaces/teachersInterface';
import { Students } from '../interfaces/studentsInterface';
import { Admin } from '../interfaces/adminInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  mailIDIncorrect = false;
  passwordIncorrect = false;
  noData = false;

  teacherData: Array<Teachers> = [];
  studentData: Array<Students> = [];
  adminData: Array<Admin> = [];

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private restService: RestService,
     private stateService: StateService,
     public  readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.getStudentData();
    this.getTeacherData();
    this.getAdminData();  
  }

  createLoginForm() : void {
    this.loginForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  fieldNameStatus(fieldName: string | number) {
    if(this.loginForm.controls[fieldName].touched && this.loginForm.controls[fieldName].errors?.required) {
      return true;
    }
    else{
      return false;
    }
  }
  
  login() : void {

    let details = {
      role: this.loginForm.controls['role'].value,
      email: this.loginForm.controls['email'].value.toLowerCase(),
      password: this.loginForm.controls['password'].value
    }

    this.restService.loggedInPersonEmail = details.email;
    this.restService.loggedInPersonRole = details.role;
   
     console.log(this.restService.loggedInPersonRole);

    if(this.loginForm.controls.role.value === 'teachers') {
      if(this.teacherData.length==0){
        this.noData = true;
      }
      else{
        this.teacherData.forEach((element: Teachers) => {
          if(element.email === details.email){
            if(element.password  === details.password){
              var loggedInPerson = this.teacherData.find((obj : { email: string; }) => { return obj.email === details.email })
              console.log("loggedInPerson=>",loggedInPerson);
              this.restService.loggedInPersonUserName = loggedInPerson?.userName;
              const dialogRef = this.dialog.open(SuccessfulpopdialogComponent);
              this.router.navigate([`/dashboard`]);
            }
            else{
              this.passwordIncorrect = true;
          
            }
            
          }
          else{
            this.mailIDIncorrect = true;
          }
          
        });
      }
    }

    else if(this.loginForm.controls.role.value === 'students') {
      
      if(this.studentData.length==0){
        this.noData = true;
      }
      else{
        this.studentData.forEach((element: Students) => {
          if(element.email === details.email){
            if(element.password  === details.password){
              var loggedInPerson = this.studentData.find((obj: { email: string; })  => { return obj.email === details.email })
              console.log("loggedInPerson=>",loggedInPerson);
              this.restService.loggedInPersonUserName = loggedInPerson?.userName;
              const dialogRef = this.dialog.open(SuccessfulpopdialogComponent);
              this.router.navigate([`/dashboard`]);
            }
            else{
              this.passwordIncorrect = true;
            }
            
          }
          else{
            this.mailIDIncorrect = true;
          }
          
        });
      }
    }
  

    else {
      var loggedInPerson = this.adminData.find((obj : { email: string; }) => { return obj.email === details.email })
      console.log("loggedInPerson=>", loggedInPerson);
      this.restService.loggedInPersonUserName = loggedInPerson?.userName;
      if(this.adminData.length==0){
        this.noData = true;
      }
      else{
        this.adminData.forEach((element: Admin) => {
          if(element.email === details.email){
            if(element.password  === details.password){
              var loggedInPerson = this.adminData.find((obj : { email: string; }) => { return obj.email === details.email })
              console.log("loggedInPerson=>", loggedInPerson);
              this.restService.loggedInPersonUserName = loggedInPerson?.userName;
              const dialogRef = this.dialog.open(SuccessfulpopdialogComponent);
              this.router.navigate([`/dashboard`]);
            }
            else{
              this.passwordIncorrect = true;
          
            }
            
          }
          else{
            this.mailIDIncorrect = true;
          }
          
        });
      }
    }
  }
  getStudentData() : void {
    // this.restService.getStudentData().pipe(
    //   first()
    // ).subscribe((response: Students[]) => {
    //   this.studentData = response;
    // });

    this.stateService.getStudentData();
    this.stateService.getStudentsList().pipe(
      skipWhile((item: Students[]) => !item),
      first()
    ).subscribe((response: Students[]) => {
      this.studentData = response;
    });
  }

  getTeacherData() : void {
    // this.restService.getTeacherData().pipe(
    //   first()
    // ).subscribe((response: Teachers[]) => {
    //   this.teacherData = response;
    // });

    this.stateService.getTeacherData();
    this.stateService.getTeachersList().pipe(
      skipWhile((item: Teachers[]) => !item),
      first()
    ).subscribe((response: Teachers[]) => {
      this.teacherData = response;
    });
  }

  getAdminData() : void {
    // this.restService.getAdminData().pipe(
    //   first()
    // ).subscribe((response: Admin[]) => {
    //   this.adminData = response;
    // });

    this.stateService.getAdminData();
    this.stateService.getAdminList().pipe(
      skipWhile((item: Admin[]) => !item),
      first()
    ).subscribe((response: Admin[]) => {
      this.adminData = response;
    });
  }
  

  

  



  


}
