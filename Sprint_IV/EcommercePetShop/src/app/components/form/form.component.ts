import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';
import validation from 'src/app/validations/validation';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({
      user_name: new FormControl(''),
      last_name: new FormControl(''),
      tipo_documento: new FormControl(''),
      documento: new FormControl(''),
      celular: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      comfirmPassword: new FormControl(''),
      acceptTerms: new FormControl(false)
  });

  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form= this.formBuilder.group({
    user_name: ['', [Validators.required, Validators.minLength(4)]],
    last_name:  ['', [Validators.required, Validators.minLength(4)]],
    tipo_documento: ['', [Validators.required]]  ,
    documento: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(8)]] ,
    celular: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10)]] ,
    telefono: ['', [Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(7)]] ,
    email:  ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]] ,
    comfirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
    },
    {
      validator:[validation.match('password', 'comfirmPassword')]
    }
    );
  } 

  get f():{[key: string]: AbstractControl}{
    return this.form.controls;
  }

  onSubmit(): void{
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
    alert("Usuario autenticado" + this.form.value.email);
  }

  onReset(): void {
    this.submitted=false;
    this.form.reset();
  }

}
