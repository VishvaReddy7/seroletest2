import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css']
})
export class EditPopupComponent implements OnInit {

  constructor(private restService: RestService,
    public dialog: MatDialog,
    private router: Router,
    public readonly dialogRef: MatDialogRef<EditPopupComponent>) { }

  ngOnInit(): void {
  }

}
