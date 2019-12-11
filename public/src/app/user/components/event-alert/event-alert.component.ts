import { Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/event/event.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Error, User } from '../../user.model';
import { UserService } from '../../user.service';
import { SocketsService } from 'src/app/core/sockets.service';

@Component({
  selector: 'app-event-alert',
  templateUrl: './event-alert.component.html',
  styleUrls: ['./event-alert.component.css']
})
export class EventAlertComponent implements OnInit {
  gift: number;
  errors: Error;

  @Input() alertUser: User;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    public socket: SocketsService
  ) {}

  ngOnInit() {
    this.errors = { errors: {} };
    this.gift = 100;
  }

  onJoin() {
    if (this.gift < 100) {
      this.errors = {
        errors: { gift: { message: 'Give at least $100 to join the game.' } }
      };
    } else if (this.gift > this.alertUser.wallet) {
      this.errors = {
        errors: { wallet: { message: 'Cannot give more than you own.' } }
      };
    } else {
      this.route.params.subscribe((params: Params) => {
        this.userService
          .decWallet(params.id, { amount: 0 - this.gift })
          .subscribe((data: Error) => {
            if ('errors' in data) {
              this.errors = data;
            } else {
              this.errors = { errors: {} };
              this.eventService.addUser(params.id, { amount: this.gift });
              this.router.navigate(['/events']);
            }
          });
      });
    }
  }
}
