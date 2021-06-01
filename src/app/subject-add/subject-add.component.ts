import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subjects } from '../interfaces/subjectsInterface';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-subject-add',
  templateUrl: './subject-add.component.html',
  styleUrls: ['./subject-add.component.css']
})
export class SubjectAddComponent implements OnInit {

  subjectAddForm!: FormGroup;
  showDeletebutton: boolean = false;
  subjectsData: Array<Subjects> = [];
  details: any;
  subjectExists: boolean = false;
  

  

  constructor(private formBuilder: FormBuilder,
    private restService: RestService) { }

  ngOnInit(): void {
    this.createSubjectAddForm();
    this.addSubjectField();
    this.getSubjectsData();
  }

  createSubjectAddForm() : void {
    this.subjectAddForm = this.formBuilder.group(
      {
        subjects: this.formBuilder.array([
          // this.formBuilder.group({
          //   name: ['', Validators.required]
          // })
        ])
      }
    );
  }
  
  createSubjectsForm() : FormGroup  {
    return  this.formBuilder.group(
      {
        name: ['', [Validators.required],],
        activitystatus: 'Active',
        isActive: true
      }
    );
  }

  get userFormGroups () : FormArray {
      return this.subjectAddForm.get('subjects') as FormArray
  }

 

  addSubjectField() : void {
    let subjects =  this.subjectAddForm.get('subjects') as FormArray;
     subjects.push(this.createSubjectsForm());
     if(subjects.length > 1) {
       this.showDeletebutton = true;
     }
     else {
       this.showDeletebutton = false;
     }
  }

  removeSubjectField(i: number) : void {
    let subjects = this.subjectAddForm.get('subjects') as FormArray;
    subjects.removeAt(i);
  }

  getSubjectsData() : void {
    this.restService.getSubjectsData().pipe(
      first()
    ).subscribe((response: Subjects[]) => {
      this.subjectsData = response;
    });
  }

  addSubjects() : void {
    this.details = {
      subjects: this.subjectAddForm.controls['subjects'].value
    }
       
     console.log("details=>", this.details);
     
    
    this.push();
  }

  push() : void {
     this.details.subjects.forEach((element: Subjects) => {
       console.log("element",element);
       if(this.subjectsData.find((o: { name: string; }) => o.name === element.name)) {
        this.subjectExists= true;
        console.log(this.subjectExists);
      }
      else {
        this.restService.push(element).subscribe((response) => {
          console.log("response=>", response);
          this.subjectExists= false;
          this.subjectAddForm.reset();
       },
       (error) => {
   
       });
      }
    },
    )
    
  }
  


}
