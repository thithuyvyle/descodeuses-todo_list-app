import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirm-dialog',
  standalone: false,
  templateUrl: './logout-confirm-dialog.component.html',
  styleUrl: './logout-confirm-dialog.component.css'
})

export class LogoutConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<LogoutConfirmDialogComponent>) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  
}
