import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { RestService } from '../rest.service';
import { StateService } from '../store/state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { first, filter} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Students } from '../interfaces/studentsInterface';
import { Subjects } from '../interfaces/subjectsInterface';
import { Admin } from '../interfaces/adminInterface';
import { Teachers } from '../interfaces/teachersInterface';


export interface EditDialogStudents {
         userDetails: Students,
         disableClose: boolean
}



@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  studentEditForm! : FormGroup;
  mailExists = false;
  
  studentData: Array<Students> = [];
  subjectsData: Array<Subjects> = [];
  userDetails!: Students;
  details: Students | undefined;

  
 

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private stateService: StateService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<StudentEditComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogStudents  
  ) {}

  ngOnInit(): void {

    this.getSubjectData();
    this.userDetails = this.data.userDetails;
    this.createStudentEditForm(this.userDetails);
    this.getStudentDtata();
    
    console.log(this.userDetails);
  }

  createStudentEditForm(userDetails: Students) : void {
    
    console.log(userDetails);
    this.studentEditForm = this.formBuilder.group(
      {
        firstName: [
          userDetails.firstName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        lastName: [
          userDetails.lastName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        fatherName: [
          userDetails.fatherName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        dateOfBirth: [
          userDetails.dateOfBirth,
          [
            Validators.required
          ],
        ],
        subjects: [
          userDetails.subjects,
          [
            Validators.required
          ],
        ],
        phoneNumber: [
          userDetails.phoneNumber,
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{10}$'),
          ],
        ],
        address: [userDetails.address, Validators.required],
        gender: [userDetails.gender, Validators.required],
        email: [userDetails.email, [Validators.required, Validators.email]],
        userName: [
          userDetails.userName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        id: [userDetails.id],
        
        password: [
          userDetails.password,
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

        confirmPassword: [userDetails.password, [Validators.required]], 
      },
      {
        validator: this.ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
    
  }

  studentEditSave() : void {

    this.details = {
      firstName: this.studentEditForm.controls['firstName'].value,
      lastName: this.studentEditForm.controls['lastName'].value,
      fatherName: this.studentEditForm.controls['fatherName'].value,
      dateOfBirth: this.studentEditForm.controls['dateOfBirth'].value,
      subjects: this.studentEditForm.controls['subjects'].value,
      phoneNumber: this.studentEditForm.controls['phoneNumber'].value,
      address: this.studentEditForm.controls['address'].value,
      gender: this.studentEditForm.controls['gender'].value,
      email: this.studentEditForm.controls['email'].value.toLowerCase(),
      userName: this.studentEditForm.controls['userName'].value,
      password: this.studentEditForm.controls['password'].value,
      activitystatus: 'Active',
      name:
        this.studentEditForm.controls['firstName'].value +
        ' ' +
        this.studentEditForm.controls['lastName'].value,
      id: this.studentEditForm.controls['id'].value  
    };
    console.log(this.details.id);
    this.restService.editPersonRole = 'students';
    this.restService.loggedInUserName = this.details.userName;
    
    // this.restService.save(this.details).subscribe((response: Students | Teachers | Admin) => {
    //   console.log("response=>",response);
    // },
    // (error) => {

    // });
    this.stateService.save(this.details);
  
     
  }

  fieldNameStatus(fieldName: string | number) {
    if (
      this.studentEditForm.controls[fieldName].touched &&
      this.studentEditForm.controls[fieldName].errors?.required
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

  getSubjectData() : void { 
    this.restService.getSubjectsData().pipe(
      filter((subject: Subjects[]) => !!subject),
      first()
    ).subscribe((response: Subjects[]) => {
      this.subjectsData = response;
    });
  }

  getStudentDtata() : void {
    this.restService.getStudentData().pipe(
      first()
    ).subscribe((response: Students[]) => {
      this.studentData = response;
    });
  }

}
