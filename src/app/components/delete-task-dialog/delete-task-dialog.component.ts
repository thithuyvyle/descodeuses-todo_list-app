import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-dialog',
  standalone: false,
  templateUrl: './delete-task-dialog.component.html',
  styleUrl: './delete-task-dialog.component.css'
})
export class DeleteTaskDialogComponent {
   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<DeleteTaskDialogComponent> 
  ) { }


  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
