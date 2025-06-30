// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/services'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private api: ApiService, // ✅ Inject the ApiService
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { phoneNumber, password } = this.loginForm.value;

    this.api.loginUser(phoneNumber, password).subscribe({
      next: (response) => {
        this.cookieService.set('auth_token', response.token, {
          path: '/',
          sameSite: 'Lax',
          secure: true
        });
        this.router.navigate(['/homev2']);
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid credentials. Please try again.';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server.';
        } else {
          this.errorMessage = error?.error?.message || 'Something went wrong. Please try later.';
        }
      }
    });
  }
}
