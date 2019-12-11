import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventComponent } from './event/event.component';
import { EventChatComponent } from './event-chat/event-chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [EventComponent, EventChatComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class EventsModule { }
