import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/core/sockets.service';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.css']
})
export class EventChatComponent implements OnInit {
  msg: string;
  constructor(public socket: SocketsService) { }

  ngOnInit() {
    this.msg = '';
  }

  newMessage() {
    console.log('chat component: ', this.msg);
    this.socket.newMessage(this.msg);
    this.msg = '';
  }

}
