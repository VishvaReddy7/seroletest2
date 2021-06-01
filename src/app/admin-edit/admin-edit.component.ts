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
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { first, filter} from 'rxjs/operators';
import { Admin } from '../interfaces/adminInterface';
import { Students } from '../interfaces/studentsInterface';
import { Teachers } from '../interfaces/teachersInterface';


@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  adminEditForm! : FormGroup;
  mailExists : boolean = false;
  
  adminData: Array<Admin>= [] ;
  userDetails!: Admin;
  details: Admin | undefined;

  constructor(private formBuilder: FormBuilder,
    private restService: RestService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AdminEditComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit(): void {

    this.userDetails = this.data.userDetails;
    
    this.createAdminEditForm(this.userDetails);
    this.getAdminData();
    
    console.log(this.userDetails);
  }

  createAdminEditForm(userDetails: Admin) : void {
    console.log(this.userDetails);
    this.adminEditForm = this.formBuilder.group(
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

  adminEditSave() : void {

    this.details = {
      firstName: this.adminEditForm.controls['firstName'].value,
      lastName: this.adminEditForm.controls['lastName'].value,
      fatherName: this.adminEditForm.controls['fatherName'].value,
      dateOfBirth: this.adminEditForm.controls['dateOfBirth'].value,
      phoneNumber: this.adminEditForm.controls['phoneNumber'].value,
      address: this.adminEditForm.controls['address'].value,
      gender: this.adminEditForm.controls['gender'].value,
      email: this.adminEditForm.controls['email'].value.toLowerCase(),
      userName: this.adminEditForm.controls['userName'].value,
      password: this.adminEditForm.controls['password'].value,
      activitystatus: 'Active',
      name:
        this.adminEditForm.controls['firstName'].value +
        ' ' +
        this.adminEditForm.controls['lastName'].value,
      id: this.adminEditForm.controls['id'].value  
    };
    console.log(this.details.id);
    this.restService.editPersonRole = 'admin';
    this.restService.save(this.details).subscribe((response: Admin | Students | Teachers) => {
      console.log("response=>",response);
    },
    (error) => {

    });
  
     
  }


  fieldNameStatus(fieldName: string | number) {
    if (
      this.adminEditForm.controls[fieldName].touched &&
      this.adminEditForm.controls[fieldName].errors?.required
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

  getAdminData() : void {
    this.restService.getAdminData().pipe(
      first()
    ).subscribe((response: Admin[]) => {
      this.adminData = response;
    });
  }

}
