import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createSingUpForm();
  }
  
  createSingUpForm() {
    this.signUpForm = this.formBuilder.group(
      {
        role: [
          '',
          [
            Validators.required,
          ]
        ]
      }
    );
  }

  showTeacher : boolean = true;
  showStudent : boolean = false;

  loadTeacher() {
    this.showTeacher = true;
    this.showStudent = false;
  }

  loadStudent() {
    this.showTeacher = false;
    this.showStudent = true;
  }

  loadAdmin() {
    this.showTeacher = false;
    this.showStudent = false;
  }

  
  


  



  

}
