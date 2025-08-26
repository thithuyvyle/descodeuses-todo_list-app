import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})

export class UserDetailComponent implements OnInit {
  formGroup!: FormGroup;
  user!: User;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) { }

  listGenre = [
    { text: 'Female', value: 'F' },
    { text: 'Male', value: 'M' }
  ]

  roles = [
    { role: 'ROLE_ADMIN' },
    { role: 'ROLE_USER' }
  ]

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.userService.getUser(id).subscribe(data => {
      this.user = data;

      this.formGroup = this.fb.group({
        id: [this.user.id],
        username: [this.user.username],
        lastName: [this.user.lastName],
        firstName: [this.user.firstName],
        genre: [this.user.genre],
        role: [this.user.role]
      })
    })
  }

  onSubmitUser() {
    if (this.formGroup.valid) {
      this.userService.updateUser(this.formGroup.value).subscribe(data => {
 
        this.snackBar.open('Saved !', "", { duration: 2000 });
        this.router.navigateByUrl('/user-list');
      })
    }
  }

}
