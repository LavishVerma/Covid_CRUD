import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../Dialog/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDeleteDialog(){
    return  this.dialog.open(DeleteDialogComponent);
    
  }
  
}
