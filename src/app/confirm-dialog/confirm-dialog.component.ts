import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public confirmMessage:string='';
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,private http:HttpClient) { }

  ngOnInit(): void {
  }

  
}

export function  openConfirmationDialog(dialog: MatDialog,confirmMessage:string){
  let dialogRef = dialog.open(ConfirmDialogComponent, {
    height: '200px',
    width: '300px',
  });
  dialogRef.componentInstance.confirmMessage = confirmMessage;
  return dialogRef;
}
