import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getToken() {
    throw new Error('Method not implemented');
  }

  private _registerUrl = 'http://localhost:8080/api/register';
  private _loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
