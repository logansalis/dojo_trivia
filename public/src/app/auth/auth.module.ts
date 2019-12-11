import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthShellComponent } from './container/auth-shell/auth-shell.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthShellComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule, HttpClientModule],
})
export class AuthModule {}
