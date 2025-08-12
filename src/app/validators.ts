import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { AuthService } from './services/auth.service';

export function emailTakenValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.checkEmailAvailability(control.value).pipe(
      map(isAvailable => isAvailable ? null : { emailTaken: true }),
      catchError(() => of(null))
    );
  };
}