import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailTakenValidator } from '../../validators';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('passwordConfirm')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }

  hidePassword = true;
  hideConfirmPassword = true;
  errorMessage: string | null = null;

  listGenre = [
    { text: 'Female', value: 'F' },
    { text: 'Male', value: 'M' }
  ]

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      lastName: [""],
      firstName: [""],
      email: ["", [Validators.required, Validators.email],
        [emailTakenValidator(this.authService)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ["", [Validators.required, Validators.minLength(8)]],
      genre: [""],
    }, {
      validators: passwordMatchValidator
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = {
        username: this.signupForm.value.email,
        password: this.signupForm.value.password,
        lastName: this.signupForm.value.lastName,
        firstName: this.signupForm.value.firstName,
        genre: this.signupForm.value.genre,
        role: 'ROLE_USER'
      };

      this.authService.registerUser(userData).subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
        error: (error) => {
          console.error('Erreur lors de l\'enregistrement', error);
          this.errorMessage = error.error;  
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }



}
