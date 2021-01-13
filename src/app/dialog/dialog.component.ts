import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {

  }

  // openDialog(){
  //   const dialogRef = this.dialog.open(DialogContent);
  //   dialogRef.afterClosed().subscribe(result =>{
  //     console.log("Dialog result: TEEEEST")
  //   })
  // }

}


