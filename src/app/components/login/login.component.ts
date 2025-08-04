import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({  //@ = décorateur: annonce à Angular à class component qui s'applique à export... avec attribut: valeur
  selector: 'app-login',     // "app"+nom pour différencier autres fichiers html en dehors des components
  standalone: false, // composant accessible via module slt (importé ds déclaration ds app.module.ts)
  templateUrl: './login.component.html', // fichier html asso par défaut
  styleUrl: './login.component.css'      // fichier css asso par défaut  
})
export class LoginComponent implements OnInit {  // export: utilisable en dehors de ce fichier, va avec import dans routing file
  // implémente interface "OnInit"( au chargement), click on LoginComponent et bulle bleue: update interface ...
  loginForm!: FormGroup; // !: pas initialisé maintenant ms plus tard, Formgroup : injection auto de angular pr récup un objet form builder qui va construire le formulaire
  // constructor is a function that is used to initialize an Angular application. 
  // The constructor is run when the application is first created, and it is responsible for setting up the Angular environment. 
  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) {
    // le service authService est injecté pour pouvoir l'utiliser
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



