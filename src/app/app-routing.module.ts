import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { LogoutGuard } from './auth/logoutGuard';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate:[LogoutGuard]},
  {path:'profil', component: ProfilComponent, canActivate: [authGuard]},
  {path:'sign-up', component:SignUpComponent, canActivate:[LogoutGuard]},
  {path:'', component: TodoListComponent, canActivate: [authGuard]}, 
  {path:'user-list', component: UserListComponent, canActivate:[AdminGuard]},
  {path:'user-detail/:id', component: UserDetailComponent, canActivate:[AdminGuard]},
  {path:'todo-detail/:id', component: TodoDetailComponent, canActivate: [authGuard]},
  {path:'todo-table', component: TodoTableComponent , canActivate: [authGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
