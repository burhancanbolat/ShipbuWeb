import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportRegionsService {

  constructor(
    private readonly http: HttpClient
  ) {

  }

  getOrigins(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/origins`));
  }
  getDestinations(): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/destinations`));
  }
  getDistricts(destinationId: any): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/districts/${destinationId}`));
  }
  getTransportMethods(regionId: any): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/methods/${regionId}`));
  }
  getTransportFees(districtId: any, methodId: any): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/fees/${districtId}/${methodId}`));
  }
  updateFee(id: any, fee: any): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/updatefee/${id}/${fee}`));
  }

}
