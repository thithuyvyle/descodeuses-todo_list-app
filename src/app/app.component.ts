import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LogoutConfirmDialogComponent } from './components/logout-confirm-dialog/logout-confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'To Do List';
  user: any;

  constructor(public authService: AuthService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/sign-up') {
        this.logout();
      }
    })
  }

  ngOnInit() {
    this.authService.loadUserFromStorage();
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    const dialogRef = this.dialog.open(LogoutConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(confirmed => {
       if (confirmed) {
        this.authService.logout();
        this.snackBar.open('Disconnected !', "", { duration: 2000 });
        this.router.navigate(['/login']);
    }
    });
  }



}
