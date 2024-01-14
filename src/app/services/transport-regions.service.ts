import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';
import CustomStore from 'devextreme/data/custom_store';
import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportRegionsService extends BaseService {

  constructor() {
    super('transportregions');

    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.originsStore = new CustomStore({
      key: 'id',
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
        return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportregions/origins`, { params }));
      }
    });

    this.destinationsStore = new CustomStore({
      key: 'id',
      byKey: async (key: any) => { },
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
        return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/transportregions/destinations`, { params }));
      }
    });

  }

  originsStore!: CustomStore;
  destinationsStore!: CustomStore;

}
