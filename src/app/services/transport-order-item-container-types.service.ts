import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportOrderItemContainerTypesService extends BaseService {

  constructor() {
    super('transportorderitemcontainertypes');
  }

  async reorder(from:any, to:any): Promise<any> {
    return lastValueFrom<any>(this.httpClient.get(`${environment.baseApiUrl}/${this.endpoint}/reorder/${from}/${to}`));
  }
}
