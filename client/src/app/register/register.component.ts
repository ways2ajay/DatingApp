import { Component, output, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { AccountServiceService } from '../_Services/account-service.service';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
//constructor(private accountService: AccountServiceService) { }
  private accountService = inject(AccountServiceService);

  private fb = inject(FormBuilder);
  private router = inject(Router);
 
  cancelRegister = output<boolean>();
  maxDate:Date = new Date();

  registerForm : FormGroup = new FormGroup({});

  validationErrors: string[] =[] ;

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', [Validators.required,Validators.minLength(4)]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required,
        Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['', 
        [Validators.required, this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  
  matchValues(matchTo: string):ValidatorFn{
    return (control: AbstractControl) =>{
      return control?.value === control?.parent?.get(matchTo)?.value 
      ?null: {isMatching: true};
    };
  }

  register(){
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});   
    this.accountService.Register(this.registerForm.value).subscribe({
      next:_  => this.router.navigateByUrl('/members') ,
      error: error => this.validationErrors= error
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  } 

  private getDateOnly(dob: string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }

}


