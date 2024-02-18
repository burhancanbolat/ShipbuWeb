import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";
import * as swal from "sweetalert2";
import CustomStore from 'devextreme/data/custom_store';
import notify from 'devextreme/ui/notify';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  user?: IUser | null;

  constructor(
    protected readonly httpClient: HttpClient
  ) { }

  get isAuthenticated() {
    return this.user != null;
  }

  isInRole(role: 'Administrators' | 'Members'): boolean {
    return this.user?.role == role ?? false;
  }

  init() {
    const item = localStorage.getItem("user");
    if (item)
      this.user = JSON.parse(item);
  }

  async register(formData: any): Promise<any> {
    return lastValueFrom(this.httpClient.post(`${environment.baseApiUrl}/account/register`, formData, { headers: { 'Content-Type': 'application/json' } }));
  }

  async confirm(formData: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/account/confirmemail/${formData.userName}/${formData.code}`,));
  }

  async signin(formData: any): Promise<any> {
    return lastValueFrom(this.httpClient.post(`${environment.baseApiUrl}/account/token`, formData, { headers: { 'Content-Type': 'application/json' } })).then<any>((response: any) => {
      if (response.result.succeeded) {
        const payload = jwt_decode.jwtDecode(response.token) as any;
        this.user = { id: payload.nameid, name: payload.given_name, userName: payload.unique_name, token: response.token, role: payload.role, refreshToken: payload.refreshToken };
        localStorage.setItem("user", JSON.stringify(this.user));
      }
      return response;
    });
  }

  async transportoffers(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.post(`${environment.baseApiUrl}/account/transportoffers`, data, { headers: { 'Content-Type': 'application/json' } }));
  }

  async transportorder(data: any): Promise<any> {
    return lastValueFrom(this.httpClient.post(`${environment.baseApiUrl}/account/transportorder`, data, { headers: { 'Content-Type': 'application/json' } }));
  }

  getOrdersStore(): CustomStore {
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }
    return new CustomStore({
      key: "id",
      load: async (loadOptions: any) => {
        let params: HttpParams = new HttpParams();
        [
          'skip',
          'take',
          'requireTotalCount',
          'requireGroupCount',
          'sort',
          'filter',
          'totalSummary',
          'group',
          'groupSummary',
        ].forEach((i) => {
          if (i in loadOptions && isNotEmpty(loadOptions[i])) {
            params = params.set(i, JSON.stringify(loadOptions[i]));
          }
        });
        return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/account/orders`, { params }));
      }
    });

  }

  
  async signout(): Promise<any> {
    swal.default.fire({
      icon: 'warning',
      title: 'Uyarı!',
      html: 'Oturumunuz sonlandırılacaktır. Devam etmek istiyor musunuz?',
      confirmButtonText: 'Devam',
      cancelButtonText: 'İptal',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.user = null;
        localStorage.removeItem("user");
      }
    })
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
