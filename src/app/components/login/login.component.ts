import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    constructor(private formBuilder : FormBuilder, private router: Router) { // private : accès à la variable ds la classe ms pas en dehors

    }

    ngOnInit(): void { 
      this.loginForm = this.formBuilder.group({
        username: ["", [Validators.required, Validators.email]], //1er paramètre "": valeur initiale du champ, 2ème (liste): validators
        password: ["", [Validators.required]]
      });
    }

    onSubmit(){
      if (this.loginForm.valid){
       // console.log(this.loginForm.value)
        if(this.loginForm.value.username =='admin@admin.com' && 
          this.loginForm.value.password == 'admin'
        ) {
          sessionStorage.setItem('isLoggedIn' ,'true'); // si user connecté
          this.router.navigateByUrl('/dashboard')  // accès à la page demandé
        }
      }
    } 

  }



