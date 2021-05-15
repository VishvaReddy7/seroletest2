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
import { MatDialog } from '@angular/material/dialog';
import { SuccessfulpopdialogComponent } from '../successfulpopdialog/successfulpopdialog.component';





@Component({
  selector: 'app-teachersignup',
  templateUrl: './teachersignup.component.html',
  styleUrls: ['./teachersignup.component.css']
})
export class TeachersignupComponent implements OnInit {

  teacherSignUpForm!: FormGroup; 
  mailExists = false;
  subjects: any;
  teacherData: any;
  details: any;

  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private restService: RestService,
     public  readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.createTeacherSignUpForm();
    this.restService.getTeacherData().subscribe((response) => {
      this.teacherData = response;
    });

    this.restService.getSubjectsData().subscribe((response) => {
      this.subjects = response;
    });
  }
  
  createTeacherSignUpForm() {
    this.teacherSignUpForm = this.formBuilder.group(
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
        experience: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]+$')
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

  teacherSignUp() {
    this.details = {
      firstName: this.teacherSignUpForm.controls['firstName'].value,
      lastName: this.teacherSignUpForm.controls['lastName'].value,
      fatherName: this.teacherSignUpForm.controls['fatherName'].value,
      dateOfBirth: this.teacherSignUpForm.controls['dateOfBirth'].value,
      subjects: this.teacherSignUpForm.controls['subjects'].value,
      experience: this.teacherSignUpForm.controls['experience'].value,
      phoneNumber: this.teacherSignUpForm.controls['phoneNumber'].value,
      address: this.teacherSignUpForm.controls['address'].value,
      gender: this.teacherSignUpForm.controls['gender'].value,
      email: this.teacherSignUpForm.controls['email'].value.toLowerCase(),
      userName: this.teacherSignUpForm.controls['userName'].value,
      password: this.teacherSignUpForm.controls['password'].value,
      activitystatus: 'Active',
      name:
        this.teacherSignUpForm.controls['firstName'].value +
        ' ' +
        this.teacherSignUpForm.controls['lastName'].value,
    };
    console.log(this.details);

    
    if(this.teacherData.find((o: { email: any; }) => o.email === this.details.email)) {
      this.mailExists= true;
    }
    else{
      const dialogRef = this.dialog.open(SuccessfulpopdialogComponent);
      this.signUp();
    }
  }

  signUp() {
    console.log(this.teacherSignUpForm.value);
    this.restService.role = 'teachers';
    this.teacherSignUpForm.reset();
    this.restService.signUp(this.details).subscribe((response) => {
      console.log("response=>", response);
    },
    (error) => {

    });
  }


  fieldNameStatus(fieldName: string | number) {
    if (
      this.teacherSignUpForm.controls[fieldName].touched &&
      this.teacherSignUpForm.controls[fieldName].errors?.required
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

}
