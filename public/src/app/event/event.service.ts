import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllEvents() {
    return this.http.get('/api/events');
  }

  getOneEvent(id: string) {
    return this.http.get('/api/events/' + id);
  }

  createEvent(event: Event) {
    console.log(event);
    return this.http.post('/api/events/new', event);
  }

  addUser(id: string, amount: object) {
    return this.http.put('/api/events/' + id + '/user', amount);
  }

  addWinner(id: string, winner: object) {
    return this.http.put('/api/events/' + id + '/winner', winner);
  }

  deleteEvent(id: string) {
    return this.http.delete('/api/events/' + id);
  }

}
