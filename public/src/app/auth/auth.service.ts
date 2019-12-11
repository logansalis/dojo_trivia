import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: object) {
    return this.http.post('/api/users/new', user);
  }

  loginUser(credentials: User) {
    return this.http.post('/api/users/login', credentials);
  }
}
