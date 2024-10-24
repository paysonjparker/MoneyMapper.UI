import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoginRequest } from '../../models/authentication/login.request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  validateRequiredFields(formControlName: any) {
    if (this.loginForm.controls[formControlName].invalid && (this.loginForm.controls[formControlName].dirty || this.loginForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  login() {
    const loginRequest: LoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authenticationService.login(loginRequest).subscribe({
      next: data => {
        console.info(data);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }

}
