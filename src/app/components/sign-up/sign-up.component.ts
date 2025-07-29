import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }
  // ajouter list dans select ici (tableau valeurs)
  listGenre = [
    { text: 'Female', value: 'F' },
    { text: 'Male', value: 'M' }
  ]

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      lastname: [""],
      firstname: [""],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]], // Validators.minLength(8)
      genre: [""],
    })
  }

  onSubmit() {
     if (this.signupForm.valid) {
    const userData = {
      username: this.signupForm.value.email, 
      password: this.signupForm.value.password,
      lastname:this.signupForm.value.lastname,
      firstname: this.signupForm.value.firstname,
      genre: this.signupForm.value.genre,
      role: 'ROLE_USER' // ou 'USER' selon ce qu’attend Spring
    };

    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Utilisateur enregistré avec succès', response);
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement', error);
      }
    });
  } else {
    this.signupForm.markAllAsTouched();
  }
   
    }


  
}
