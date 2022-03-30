import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MovieRequestsApiService } from '../api/movie-requests.api.service';
import { AuthenticationContainerComponent } from './authentication-container/authentication-container.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
  ],
  declarations: [
    AuthenticationContainerComponent,
    ConfirmRegistrationComponent,
    LoginComponent,
    RegisterComponent,
  ],
  providers: [MovieRequestsApiService],
})
export class AuthenticationModule {}
