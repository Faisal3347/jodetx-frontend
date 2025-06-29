import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // ✅ updated field name
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { phoneNumber, password } = this.loginForm.value;

    this.http.post<{ token: string }>('http://localhost:3000/user/login', { phoneNumber, password })
      .subscribe({
        next: (response) => {
          this.cookieService.set('auth_token', response.token, {
            path: '/',
            sameSite: 'Lax',
            secure: true
          });
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
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
