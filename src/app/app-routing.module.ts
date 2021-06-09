import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: '', outlet:'inside', component: MyProfileComponent},
    {path: 'studentslist', outlet:'inside', component: StudentsListComponent},
    {path: 'teachersList', outlet:'inside', component: TeachersListComponent},
    {path: 'myProfile', outlet:'inside', component: MyProfileComponent},
    {path: 'subjects', outlet:'inside', component: SubjectsComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
