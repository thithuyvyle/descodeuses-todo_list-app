import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'To Do List';
  user: any;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.loadUserFromStorage(); 
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }
  logout(): void {
    this.authService.logout();
    this.snackBar.open('Disconnected !', "", { duration: 2000 });
    this.router.navigate(['/login']);
  }
}
