import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get('/api/users');
  }

  getOneUser(id: string) {
    return this.http.get('/api/users/' + id);
  }

  updateUser(user: User) {
    return this.http.put('/api/users/' + user._id, user);
  }

  incWallet(id: string, amount: object) {
    return this.http.put('/api/users/' + id + '/increase', amount);
  }

  decWallet(id: string, amount: object) {
    return this.http.put('/api/users/' + id + '/decrease', amount);
  }

  deleteUser(id: string) {
    return this.http.delete('/api/users/' + id);
  }
}
