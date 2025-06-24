import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})

export class SignUpComponent implements OnInit {
  signupForm! : FormGroup;
  constructor (private fb: FormBuilder){
  }
  // ajouter list dans select ici (tableau valeurs)
  listGenre= [
    {text: 'Female', value: 'F'},
    {text: 'Male', value: 'M'}
  ]

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      lastname: ["", [Validators.required]],
      firstname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      genre: ["", [Validators.required]],
    })
  }

  onSubmit() {
      console.log(this.signupForm.value); // récup value des input
  
  }

}
