import { importProvidersFrom, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilComponent } from './components/profil/profil.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {MatSelectModule} from '@angular/material/select';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { authInterceptor } from './auth/auth.interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LogoutConfirmDialogComponent } from './components/logout-confirm-dialog/logout-confirm-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilComponent,
    SignUpComponent,
    TodoListComponent,
    UserListComponent,
    TodoDetailComponent,
    TodoTableComponent,
    DashboardComponent,
    ConfirmDialogComponent,
    LogoutConfirmDialogComponent,
    ConfirmDeleteDialogComponent,
    UserDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    RouterLink,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    
    
  ],
  providers: [
        provideHttpClient(withInterceptors([
        authInterceptor
      ])
    ),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'fr' },
     provideHttpClient(),
    /*   j'injecte in-memory-data-service.ts car @Injectable dans "Root"
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, {delay:200}
      )
    ])*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
