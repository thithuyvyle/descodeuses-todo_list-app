import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from "../components/confirm-dialog/confirm-dialog.component";
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })

export class LogoutGuard implements CanActivate {
  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        const isLoggedIn = !!user && !!this.authService.getCurrentUser(); // Vérifie aussi token
        if (isLoggedIn) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { message: 'You are already logged in. Do you want to log out?' }
          });
          return dialogRef.afterClosed().pipe(
            map(result => {
              if (result) {
                this.authService.logout();
                return true;
              } else {
                return false;
              }
            })
          );
        } else {
          return of(true);
        }
      })
    );
  }
}