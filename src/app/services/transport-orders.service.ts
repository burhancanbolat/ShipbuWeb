import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportOrdersService extends BaseService {

  constructor() {
    super("transportorders");
  }

  async updateorderprice(id: any, newPrice: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportorders/updateorderprice/${id}/${newPrice}`));
  }

  async updateordershipping(id: any, shippingNumber: any, trackingNumber: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportorders/updateordershipping/${id}/${shippingNumber}/${trackingNumber}`));
  }

  async paymentorder(id: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportorders/paymentorder/${id}`));
  }
 
  async deliveredorder(id: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportorders/deliveredorder/${id}`));
  }
  
  async cancelorder(id: any): Promise<any> {
    return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportorders/cancelorder/${id}`));
  }
  
}
