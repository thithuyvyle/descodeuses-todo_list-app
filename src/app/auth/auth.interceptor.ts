import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken'); 
  // Ne pas ajouter d'en-tête Authorization pour les routes /auth/signup et /auth/login sinon erreur 403 
  if (
    req.url.includes('/auth/signup') ||
    req.url.includes('/auth/login')
  ) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};