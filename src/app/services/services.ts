// src/app/services/services.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Login API
  loginUser(phoneNumber: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.BASE_URL}/user/login`, {
      phoneNumber,
      password,
    });
  }

  // Register API
  registerUser(user: {
    name: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user/register`, user);
  }

  // Aadhaar fetch API
  getAadhaarDetails(): Observable<{ status: string; data: any[] }> {
    return this.http.get<{ status: string; data: any[] }>(
      `${this.BASE_URL}/aadhaar/details`,
      { withCredentials: true }
    );
  }

  // Aadhaar upload API
  uploadAadhaarImage(file: File, token: string): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${this.BASE_URL}/aadhaar/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}
