import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-successfulpopdialog',
  templateUrl: './successfulpopdialog.component.html',
  styleUrls: ['./successfulpopdialog.component.css']
})
export class SuccessfulpopdialogComponent implements OnInit {

  constructor(private restService: RestService, private router: Router, public readonly dialogRef: MatDialogRef<SuccessfulpopdialogComponent>) { }

  ngOnInit(): void {
  }

}
