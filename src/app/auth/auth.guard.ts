import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);   // inject(Router) si pas de constructeur router
  if(sessionStorage.getItem('authToken')){
      return true;
  } else {
    return router.createUrlTree(['/login'])  
  }  
};
