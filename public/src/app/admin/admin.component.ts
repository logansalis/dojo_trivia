import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { SocketsService } from '../core/sockets.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  events: Event[];
  newEvent: Event;
  constructor(
    private userService: UserService,
    private eventService: EventService,
    private socket: SocketsService
  ) {}

  ngOnInit() {
    this.newEvent = { name: '', jackpot: 0 };
    this.getAllUsers();
    this.getAllEvents();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((data: Event[]) => {
      this.events = data;
    });
  }

  onCreateEvent() {
    this.eventService.createEvent(this.newEvent).subscribe(data => {
      console.log(data);
      this.getAllEvents();
      this.socket.newEvent(this.newEvent);
      this.newEvent = { name: '', jackpot: 0 };
    });
  }

  onDeleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  onDeleteEvent(id: string) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.getAllEvents();
    });
  }
}
