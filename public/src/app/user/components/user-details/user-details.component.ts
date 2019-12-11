import { Component, OnInit } from '@angular/core';
import { User, Error } from '../../user.model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { SocketsService } from 'src/app/core/sockets.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  edit: boolean;
  errors: Error;
  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    public socket: SocketsService
  ) {}

  ngOnInit() {
    this.user = { name: '', password: '' };
    this.errors = { errors: {} };
    this.edit = false;
    this.route.params.subscribe((params: Params) => {
      this.getUser(params.id);
    });
  }

  getUser(id: string) {
    this.service.getOneUser(id).subscribe((data: User) => {
      this.user = data;
      this.socket.thankYou(data);
    });
  }

  onUpdate() {
    this.service.updateUser(this.user).subscribe((data: Error) => {
      if ('errors' in data) {
        this.errors = data;
      } else {
        this.errors = { errors: {} };
        this.edit = false;
      }
    });
  }

  onCancel() {
    this.edit = false;
  }

  onEdit() {
    this.edit = true;
  }
}
