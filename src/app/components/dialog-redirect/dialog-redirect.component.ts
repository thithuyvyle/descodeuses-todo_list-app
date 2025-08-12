import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-redirect',
  standalone: false,
  templateUrl: './dialog-redirect.component.html',
  styleUrl: './dialog-redirect.component.css'
})
export class DialogRedirectComponent {
constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<DialogRedirectComponent>
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
