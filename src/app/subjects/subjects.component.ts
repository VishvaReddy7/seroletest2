import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects: any;

  constructor(private restService: RestService) { }

  ngOnInit(): void {
       this.restService.getSubjectsData().subscribe((response) => {
           this.subjects = response;
       })
  }

  displayedColumns: string[] = ['subjects', 'actions']

}
