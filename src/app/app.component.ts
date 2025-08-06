import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To Do List';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Deconnected !', "", { duration: 2000 });
    this.router.navigate(['/login']);
  }
}
