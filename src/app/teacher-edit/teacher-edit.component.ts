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
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { first } from 'rxjs/operators';
import { Teachers } from '../interfaces/teachersInterface';
import { Subjects } from '../interfaces/subjectsInterface';
import { Admin } from '../interfaces/adminInterface';
import { Students } from '../interfaces/studentsInterface';


export interface EditDialogTeachers {
  userDetails: Teachers,
  disableClose: boolean
}

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.css']
})
export class TeacherEditComponent implements OnInit {

  teacherEditForm! : FormGroup;
  mailExists = false;
  
  teacherData: Array<Teachers> = [];
  subjects: Array<Subjects> = [];
  userDetails!: Teachers;
  details: Teachers | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private stateService: StateService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<TeacherEditComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogTeachers    
  ) { }

  ngOnInit(): void {
    this.getSubjectsData();
    
    this.userDetails = this.data.userDetails;
    
    this.createTeacherEditForm(this.userDetails);
    this.getTeacherData();
    
    console.log(this.userDetails);
  }

  createTeacherEditForm(userDetails: Teachers) : void {


    console.log(userDetails);
    this.teacherEditForm = this.formBuilder.group(
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
        experience: [
          userDetails.experience,
          [
            Validators.required,
            Validators.pattern('^[0-9]+$')
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

  teacherEditSave() : void {

    this.details = {
      firstName: this.teacherEditForm.controls['firstName'].value,
      lastName: this.teacherEditForm.controls['lastName'].value,
      fatherName: this.teacherEditForm.controls['fatherName'].value,
      dateOfBirth: this.teacherEditForm.controls['dateOfBirth'].value,
      subjects: this.teacherEditForm.controls['subjects'].value,
      experience: this.teacherEditForm.controls['experience'].value,
      phoneNumber: this.teacherEditForm.controls['phoneNumber'].value,
      address: this.teacherEditForm.controls['address'].value,
      gender: this.teacherEditForm.controls['gender'].value,
      email: this.teacherEditForm.controls['email'].value.toLowerCase(),
      userName: this.teacherEditForm.controls['userName'].value,
      password: this.teacherEditForm.controls['password'].value,
      activitystatus: 'Active',
      name:
        this.teacherEditForm.controls['firstName'].value +
        ' ' +
        this.teacherEditForm.controls['lastName'].value,
      id: this.teacherEditForm.controls['id'].value  
    };
    console.log(this.details.id);
    this.restService.editPersonRole = 'teachers';
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
      this.teacherEditForm.controls[fieldName].touched &&
      this.teacherEditForm.controls[fieldName].errors?.required
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

  getSubjectsData() : void {
    this.restService.getSubjectsData().pipe(
      first()
    ).subscribe((response: Subjects[]) => {
      this.subjects = response;
    });
  }

  getTeacherData() : void {
    this.restService.getTeacherData().pipe(
      first()
    ).subscribe((response: Teachers[]) => {
      this.teacherData = response;
    });
  }
  
}


