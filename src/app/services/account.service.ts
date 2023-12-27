import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user?: IUser;

  constructor(
    protected readonly httpClient: HttpClient
  ) { }

  get isAuthenticated() {
    return this.user == null;
  }

  async register(formData: any): Promise<any> {
    return lastValueFrom(this.httpClient.post(`${environment.baseApiUrl}/account/register`, formData, { headers: { 'Content-Type': 'application/json' } }));
  }

  async confirm(formData: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/account/confirmemail/${formData.userName}/${formData.code}`,));
  }

  async signin(formData: any): Promise<any> {
    return lastValueFrom(this.httpClient.post(`${environment.baseApiUrl}/account/token`, formData, { headers: { 'Content-Type': 'application/json' } })).then<any>((response: any) => {
      const payload = jwt_decode.jwtDecode(response.token) as any;
      this.user = { id: payload.nameid, name: payload.given_name, userName: payload.unique_name, token: response.token, role: payload.role, refreshToken: payload.refreshToken };
      return response;
    });
  }
}

export interface IUser {
  id: string,
  userName: string,
  name: string,
  token: string,
  role: string,
  refreshToken: string
}
