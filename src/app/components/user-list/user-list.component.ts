import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  formGroup: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.formGroup = this.fb.group({
      username: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    })
  }
  // liste users
  fetchUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    })
  }
  // add user
  onAddUser() {
    if (this.formGroup.valid) {
      const formValue = this.formGroup.value;
      const user: User = {
        id: null,
        username: formValue.username,
        lastName: null,
        firstName: null,
        genre: null,
        role: null,
      };

      this.userService.addUser(user).subscribe(data => {
        this.fetchUsers();
      });
    }
  }
  //trash icon
  onRemoveUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent , {
      data:{username: user.username}
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (!user.id) return;
        this.userService.deleteUser(user.id).subscribe(() => {
          this.fetchUsers();
          this.snackBar.open('Deleted !', "", { duration: 2000 });
        });
      }
    })
  }


}
