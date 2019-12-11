import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EventComponent } from './event/event/event.component';
import { UserShellComponent } from './user/container/user-shell/user-shell.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule),
  },
  {path: 'admin', component: AdminComponent},
  {
    path: 'user/:id', component: UserShellComponent,
  },
  {path: 'events', component: EventComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
