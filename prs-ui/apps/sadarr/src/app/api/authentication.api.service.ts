import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmRegistrationRequestModel } from '../authentication/models/confirm-registration.model';
import {
  LoginRequestModel,
  LoginResponseModel,
} from '../authentication/models/login.model';
import { RegisterRequestModel } from '../authentication/models/register.model';
import { PrsApiService } from '../shared/api/prs.api.service';
import { MessageResponse } from './models/message-response.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationApiService {
  private baseUrl: string = 'https://localhost:7299/authentication';
  constructor(private http: HttpClient, private prsApiService: PrsApiService) {}

  checkSession(): Observable<boolean> {
    return this.prsApiService.get<boolean>('Authentication/CheckSession');
  }

  confirmRegistration(
    confirmRegistration: ConfirmRegistrationRequestModel
  ): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.baseUrl}/confirmregistration`,
      confirmRegistration
    );
  }

  login(login: LoginRequestModel): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.baseUrl}/login`, login);
  }

  register(register: RegisterRequestModel): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.baseUrl}/register`,
      register
    );
  }
}
