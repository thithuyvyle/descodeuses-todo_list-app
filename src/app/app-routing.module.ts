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


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'profil', component: ProfilComponent, canActivate: [authGuard]},
  {path:'sign-up', component:SignUpComponent},
  {path:'', component: TodoListComponent, canActivate: [authGuard]}, 
  {path:'user', component: UserListComponent},
  {path:'todo-detail/:id', component: TodoDetailComponent, canActivate: [authGuard]},
  {path:'todo-table', component: TodoTableComponent , canActivate: [authGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate: [authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
