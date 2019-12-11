import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserShellComponent } from './container/user-shell/user-shell.component';
import { EventAlertComponent } from './components/event-alert/event-alert.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [UserShellComponent, UserDetailsComponent, EventAlertComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class UserModule { }
