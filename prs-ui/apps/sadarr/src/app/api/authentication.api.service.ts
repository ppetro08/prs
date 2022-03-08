import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmRegistrationRequestModel } from '../authentication/models/confirm-registration.model';
import {
  LoginRequestModel,
  LoginResponseModel,
} from '../authentication/models/login.model';
import { RegisterRequestModel } from '../authentication/models/register.model';
import { MessageResponse } from './models/message-response.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationApiService {
  constructor(private http: HttpClient) {}

  confirmRegistration(
    confirmRegistration: ConfirmRegistrationRequestModel
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `https://localhost:7299/authentication/confirmregistration`,
      confirmRegistration
    );
  }

  login(login: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(
      `https://localhost:7299/authentication/login`,
      login
    );
  }

  register(register: RegisterRequestModel): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `https://localhost:7299/authentication/register`,
      register
    );
  }
}
