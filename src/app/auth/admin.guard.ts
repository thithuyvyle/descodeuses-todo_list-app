import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAdmin = this.authService.isAdmin;
      console.log('AdminGuard :', isAdmin); //
    if (isAdmin) {
      return true;
    }
    this.router.navigate(['/']); // Redirige si pas admin
    return false;
  }
}