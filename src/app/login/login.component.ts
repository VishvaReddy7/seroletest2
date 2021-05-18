import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from '../successfulpopdialog/successfulpopdialog.component';

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

  teacherData: any = [];
  studentData: any = [];
  adminData: any = [];

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private restService: RestService,
     public  readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.createLoginForm();

    this.restService.getTeacherData().subscribe((response) => {
      this.teacherData = response;
    });

    this.restService.getStudentData().subscribe((response) => {
      this.studentData = response;
    });

    this.restService.getAdminData().subscribe((response) => {
      this.adminData = response;
    });
  }

  createLoginForm() {
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
  
  login(){

    let details = {
      role: this.loginForm.controls['role'].value,
      email: this.loginForm.controls['email'].value.toLowerCase(),
      password: this.loginForm.controls['password'].value
    }

    this.restService.loggedInPersonEmail = details.email;
    this.restService.loggedInPersonRole = details.role;

     console.log(this.loginForm.controls.role.value);

    if(this.loginForm.controls.role.value === 'teacher') {
      if(this.teacherData.length==0){
        this.noData = true;
      }
      else{
        this.teacherData.forEach((element: any) => {
          if(element.email === details.email){
            if(element.password  === details.password){
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

    else if(this.loginForm.controls.role.value === 'student') {
      if(this.studentData.length==0){
        this.noData = true;
      }
      else{
        this.studentData.forEach((element: any) => {
          if(element.email === details.email){
            if(element.password  === details.password){
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
      if(this.adminData.length==0){
        this.noData = true;
      }
      else{
        this.adminData.forEach((element: any) => {
          if(element.email === details.email){
            if(element.password  === details.password){
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

  


}
