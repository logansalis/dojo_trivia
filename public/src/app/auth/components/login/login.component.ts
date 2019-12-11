import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Error } from '../../../user/user.model.js';
import { AuthService } from '../../auth.service';
import { SocketsService } from 'src/app/core/sockets.service.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  errors: Error;
  constructor(
    private service: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = { name: '', password: '' };
    this.errors = { errors: {} };
  }

  onLogin() {
    this.service.loginUser(this.user).subscribe((data: User[]) => {
      if ('errors' in data) {
        this.errors = data;
      } else {
        if (data[0].name === 'Logan') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user/' + data[0]._id]);
        }
      }
    });
  }
}
