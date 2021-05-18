import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  studentEditForm! : FormGroup;
  mailExists = false;
  userDetails: any;
  studentData: any;
  subjects: any;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private router: Router,
    public readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.createStudentEditForm();
  }

  createStudentEditForm() {
    

    this.restService.getStudentData().subscribe((response) => {
      this.studentData = response;
      console.log("Studnet Data=>", this.studentData);
      console.log("user Exist in rest service =>", this.restService.userExist);

      this.userDetails = this.studentData.find(
      (o: { userName: any }) => o.userName === this.restService.userExist
    );
    console.log("user Details=>", this.userDetails);


    

    

    this.restService.getSubjectsData().subscribe((response) => {
      this.subjects = response;
    
    
    
    console.log(this.userDetails);
    this.studentEditForm = this.formBuilder.group(
      {
        firstName: [
          this.userDetails?.firstName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        lastName: [
          this.userDetails?.lastName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        fatherName: [
          this.userDetails?.fatherName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        dateOfBirth: [
          this.userDetails?.dateOfBirth,
          [
            Validators.required
          ],
        ],
        subjects: [
          this.userDetails?.subjects,
          [
            Validators.required
          ],
        ],
        phoneNumber: [
          this.userDetails?.phoneNumber,
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern('^[0-9]{10}$'),
          ],
        ],
        address: [this.userDetails.address, Validators.required],
        gender: [this.userDetails.gender, Validators.required],
        email: [this.userDetails.email, [Validators.required, Validators.email]],
        userName: [
          this.userDetails.userName,
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[0-9a-zA-Z \b]+$'),
          ],
        ],
        
        password: [
          this.userDetails.password,
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

        confirmPassword: [this.userDetails.password, [Validators.required]], 
      },
      {
        validator: this.ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  });
  });
    
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

}
