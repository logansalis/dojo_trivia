import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Event } from '../event/event.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
    private socket;
    private userId: string;
    private userName: string;
    isEvent: boolean = false;
    countdown: number = 0;
    jackpot: number;
    question = '';
    answers = [];
    questionNum = 1;
    correct = '';
    loser = false;
    messages = [];

  constructor( private http: HttpClient, private router: Router ) {
    this.socket = io();
    this.onConnect();
    this.onUserData();
    this.onEventAlert();
    this.onQuestionNumber();
    this.onNewQuestion();
    this.onGameCount();
    this.onGameFinished();
    this.onNewMessage();
  }

  thankYou(msg: object) {
    this.socket.emit('thankyou', msg);
  }

  onConnect() {
    this.socket.on('greeting', (data) => {
      this.messages = data.messages;
      console.log(data.msg);
    });
  }

  onUserData() {
    this.socket.on('user', data => {
      this.userId = data._id;
      this.userName = data.name;
      console.log(this.userId);
    });
  }

  newEvent(event: Event) {
    this.jackpot = event.jackpot;
    this.getQuestions().subscribe( (data: Question) => {
      this.socket.emit('newEvent', data.results);
    });
  }

  onEventAlert() {
    this.socket.on('alertEvent', (data) => {
      this.isEvent = data.event;
      this.countdown = data.countdown;
      this.loser = data.loser;
    });
  }

  joinEvent(amount: number) {
    this.jackpot += amount;
  }

  getQuestions() {
    return this.http.get('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple&encode');
  }

  onQuestionNumber() {
    this.socket.on('questionNumber', data => {
      this.questionNum = data.number + 1;
    });
  }

  onNewQuestion() {
    this.socket.on('newQuestion', data => {
      this.question = data.question.replace(/&quot;/g, '\"');
      this.answers = data.answers;
      this.correct = data.correct;
    });
  }

  onGameCount() {
    this.socket.on('gameCount', data => {
      this.countdown = data.countdown;
    });
  }

  onGameFinished() {
    this.socket.on('gameFinished', data => {
      this.messages = data;
      this.router.navigate(['/user/' + this.userId]);
      this.question = '';
      this.answers = [];
      this.questionNum = 1;
      this.correct = '';
      this.loser = false;
    });
  }

  newMessage(msg: string) {
    const data = {name: this.userName, message: msg};
    this.socket.emit('newMessage', data);
  }

  onNewMessage() {
    this.socket.on('onNewMessage', data => {
      this.messages = data;
    });
  }
}


interface Question {
  response_code: number;
  results: [];
}
