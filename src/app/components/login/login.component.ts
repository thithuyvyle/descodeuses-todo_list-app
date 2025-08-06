import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({  
  selector: 'app-login',     
  standalone: false, 
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css'     
})
export class LoginComponent implements OnInit { 
  loginForm!: FormGroup; 
  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) {
    
  }
  username: string = '';
  userId: string = '';
  
  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') || '';

    const userStr = sessionStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (user) {
      this.username = user.username;
      this.userId = user.id;
    }

    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]], 
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (res) => {
          sessionStorage.setItem('authToken', res.token);
          sessionStorage.setItem('user', JSON.stringify({
            id: res.id,
            username: res.username
          }));
          this.router.navigateByUrl('');
        },
        error: (err) => console.error('Erreur de connexion', err),
      });

    }
  }

}



