import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportStaticPagesService extends BaseService {

  constructor() {
    super('transportstaticpages')
  }

  async reorder(from: any, to: any): Promise<any> {
    return lastValueFrom<any>(this.httpClient.get(`${environment.baseApiUrl}/${this.endpoint}/reorder/${from}/${to}`));
  }
  currentPage?: any;
  
}
