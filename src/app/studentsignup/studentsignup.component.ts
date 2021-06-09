import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { StateService } from '../store/state.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from '../successfulpopdialog/successfulpopdialog.component';
import { Subjects } from '../interfaces/subjectsInterface';
import { Students } from '../interfaces/studentsInterface';
import { first, skipWhile } from 'rxjs/operators';



@Component({
  selector: 'app-studentsignup',
  templateUrl: './studentsignup.component.html',
  styleUrls: ['./studentsignup.component.css']
})
export class StudentsignupComponent implements OnInit {

  studentSignUpForm!: FormGroup; 
  mailExists: boolean = false;
  userNameExists: boolean = false;
  subjectsData: Array<Subjects> = [];
  studentData: Array<Students> = [];
  details: Students | undefined;
  activeSubjects: Array<Subjects> = [];

  

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private restService: RestService,
     private stateService: StateService, 
     public  readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getStudentsData();
    this.getSubjectsData();
    this.createStudentSignUpForm();  
  }
  
  createStudentSignUpForm() : FormGroup {
    return this.studentSignUpForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        fatherName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        dateOfBirth: [
          '',
          [
            Validators.required
          ],
        ],
        subjects: [
          '',
          [
            Validators.required
          ],
        ],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{10}$'),
          ],
        ],
        address: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        
        password: [
          '',
          Validators.compose([
            Validators.required,
            this.patternValidator(/\d/, { hasNumber: true }),
            this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            this.patternValidator(/[a-z]/, { hasSmallCase: true }),
            this.patternValidator(/(?=.*?[#?!@$%^&*-])/, {
              hasSpecialCharacters: true,
            }),
            Validators.minLength(8),
            Validators.maxLength(20),
          ]),
        ],

        confirmPassword: [null, [Validators.required]], 
      },
      {
        validator: this.ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  studentSignUp() : void {
    this.details = {
      firstName: this.studentSignUpForm.controls['firstName'].value,
      lastName: this.studentSignUpForm.controls['lastName'].value,
      fatherName: this.studentSignUpForm.controls['fatherName'].value,
      dateOfBirth: this.studentSignUpForm.controls['dateOfBirth'].value,
      subjects: this.studentSignUpForm.controls['subjects'].value,
      phoneNumber: this.studentSignUpForm.controls['phoneNumber'].value,
      address: this.studentSignUpForm.controls['address'].value,
      gender: this.studentSignUpForm.controls['gender'].value,
      email: this.studentSignUpForm.controls['email'].value.toLowerCase(),
      userName: this.studentSignUpForm.controls['userName'].value,
      password: this.studentSignUpForm.controls['password'].value,
      activitystatus: 'Active',
      name:
        this.studentSignUpForm.controls['firstName'].value +
        ' ' +
        this.studentSignUpForm.controls['lastName'].value,
    };


    
    if(this.studentData.find((o: { email: string; }) => o.email === this.details?.email)) {
      this.mailExists= true;
    }
    else{
      if(this.studentData.find((o: { userName: string;}) => o.userName === this.details?.userName)) {
        this.userNameExists = true;
      }
      else{
        const dialogRef = this.dialog.open(SuccessfulpopdialogComponent);
        this.signUp(this.details);
      }
      
    }
  }

  signUp(details: Students) : void {
     this.restService.role = 'students';
     console.log(this.studentSignUpForm, "<=before reset");
     this.createStudentSignUpForm();
     console.log(this.studentSignUpForm, "<=after reset");
    //  this.restService.signUp(details).subscribe((response) => {
    //    console.log("response=>",response);
    //  },
    //  (error) => {

    //  });
    this.stateService.signUp(details);
    this.stateService.getSignUpData().subscribe((response) => {
      console.log("response=>", response);
    },
    (error) => {

    })
  }

  fieldNameStatus(fieldName: string | number) {
    if (
      this.studentSignUpForm.controls[fieldName].touched &&
      this.studentSignUpForm.controls[fieldName].errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null as any;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : (error as any);
    };
  }

  ConfirmPasswordValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[password];
      let matchingControl = formGroup.controls[confirmPassword];
      if (control.touched && matchingControl.touched) {
        if (control.value != matchingControl.value) {
          matchingControl.setErrors({ Mismatch: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    };
  }

  getStudentsData() : void {
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

  getSubjectsData() : void {
    this.stateService.getSubjectsData();
    this.stateService.getSubjectsList().pipe(
      skipWhile((item: Subjects[]) => !item),
      first()
    ).subscribe((response: Subjects[]) => {
      this.subjectsData = response;
      this.subjectsData.forEach((element: Subjects) => {
        if(element.isActive) {
          this.activeSubjects.push(element);
        }
        else {}
      });
    });
  }
  
}
