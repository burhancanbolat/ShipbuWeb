import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor() {
    super('users')
  }
  
  async banUser(id: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(environment.baseApiUrl + '/users/banuser/' + id));
  }

  async unBanUser(id: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(environment.baseApiUrl + '/users/unbanuser/' + id));
  }

}
