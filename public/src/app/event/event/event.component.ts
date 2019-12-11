import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/core/sockets.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  loser: boolean;
  clicked = false;
  constructor(public socket: SocketsService) { }

  ngOnInit() {
    this.loser = false;

  }

  log(ans: string) {
    console.log(ans === this.socket.correct);
    if (ans !== this.socket.correct) {
      this.loser = true;
      this.socket.newMessage('I have lost :(');
    }
  }

}
