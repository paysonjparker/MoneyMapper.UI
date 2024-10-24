import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AddUserRequest } from '../../models/user/add-user.request';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      fullName: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      emailAddress: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
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
    if (this.registerForm.controls[formControlName].invalid && (this.registerForm.controls[formControlName].dirty || this.registerForm.controls[formControlName].touched)) {
      return true;
    }
    return false;
  }

  register() {
    const addUserRequest: AddUserRequest = {
      fullName: this.registerForm.get('fullName')?.value,
      emailAddress: this.registerForm.get('emailAddress')?.value,
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };

    this.userService.createUser(addUserRequest).subscribe({
      next: data => {
        console.info(data);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['login']);
  }
}
