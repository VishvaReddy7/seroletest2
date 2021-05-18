import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { TeachersignupComponent } from './teachersignup/teachersignup.component';
import { StudentsignupComponent } from './studentsignup/studentsignup.component';
import { SuccessfulpopdialogComponent } from './successfulpopdialog/successfulpopdialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { StudentEditComponent } from './student-edit/student-edit.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    LoginComponent,
    TeachersignupComponent,
    StudentsignupComponent,
    SuccessfulpopdialogComponent,
    DashboardComponent,
    StudentsListComponent,
    TeachersListComponent,
    MyProfileComponent,
    SubjectsComponent,
    ConfirmationDialogComponent,
    EditPopupComponent,
    StudentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule   
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
