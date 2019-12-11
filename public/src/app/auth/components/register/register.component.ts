import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Error } from '../../../user/user.model';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: User;
  errors: Error;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.newUser = { name: '', email: '', password: '' };
    this.errors = {errors: {}};
  }

  onRegister() {
    this.service.registerUser(this.newUser).subscribe((data: User) => {
      if ('errors' in data) {
        this.errors = data;
      } else {
        this.router.navigate(['/user/' + data._id]);
      }
    });
  }
}
