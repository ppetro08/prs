export interface RegisterRequestModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface RegisterResponseModel {
  email: string;
  token: string;
}
