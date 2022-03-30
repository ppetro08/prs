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
  private readonly endpoint = 'authentication';

  constructor(private prsApiService: PrsApiService) {}

  checkSession(): Observable<boolean> {
    return this.prsApiService.get<boolean>(`${this.endpoint}/CheckSession`);
  }

  confirmRegistration(
    confirmRegistration: ConfirmRegistrationRequestModel
  ): Observable<MessageResponse> {
    return this.prsApiService.post(
      `${this.endpoint}/confirmregistration`,
      confirmRegistration
    );
  }

  login(login: LoginRequestModel): Observable<LoginResponseModel> {
    return this.prsApiService.post(`${this.endpoint}/login`, login);
  }

  register(register: RegisterRequestModel): Observable<MessageResponse> {
    return this.prsApiService.post(`${this.endpoint}/register`, register);
  }
}
