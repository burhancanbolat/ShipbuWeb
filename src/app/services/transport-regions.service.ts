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
  getDistricts(destinationId : any): Promise<any[]> {
    return lastValueFrom(this.http.get<any[]>(`${environment.baseApiUrl}/transportregions/districts/${destinationId}`));
  }

}
