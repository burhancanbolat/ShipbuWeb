import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportPaymentsService extends BaseService {

  constructor() {
    super('transportpayments')
  }

  async userBalance(id: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(environment.baseApiUrl + '/transportpayments/userbalance/' + id));
  }

}
