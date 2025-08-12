import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  formGroup: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private snackBar: MatSnackBar) {
    this.formGroup = this.fb.group({
      username: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users= data;
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
    if (this.formGroup.valid ) {
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
  onRemoveUser(id: number | null) { 
    if (id == null) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
      this.snackBar.open('Deleted !', "", { duration: 2000 });
    });
  }


}
