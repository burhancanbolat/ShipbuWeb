import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import notify from 'devextreme/ui/notify';

export abstract class BaseService {

  constructor(endpoint: string, key: string = 'id') {
    this.endpoint = endpoint;
    this.key = key;
    function isNotEmpty(value: any): boolean {
      return value !== undefined && value !== null && value !== '';
    }

    this.httpClient = inject(HttpClient);
    this.store = new CustomStore({
      key: key,
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
        return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/${endpoint}`, { params }));
      },
      byKey: async (key: any) => {
        return lastValueFrom(this.httpClient.get(`${environment.baseApiUrl}/${key}`));
      },
      insert: async (params: any) => {
        return lastValueFrom(
          this.httpClient.post(
            `${environment.baseApiUrl}/${endpoint}`,
            params
          ).pipe(
            map((result: any) => {
              notify({
                message: 'Kayıt ekleme işlemi başarıyla tamamlanmıştır',
                type: 'success',
                displayTime: 5000
              });
              return result;
            }
            ))
        ).catch((result) => {
          notifyError(result);
        });
      },
      update: async (key: any, params: any) => {
        return lastValueFrom(
          this.httpClient.put(
            `${environment.baseApiUrl}/${endpoint}/${key}`,
            params
          ).pipe(
            map((result: any) => {
              notify({
                message: 'Kayıt güncelleme işlemi başarıyla tamamlanmıştır',
                type: 'success',
                displayTime: 5000
              });
              return result;
            }
            ))
        ).catch((result) => {
          notifyError(result);
        });
      },
      remove: async (key: any) => {
        return lastValueFrom(
          this.httpClient.delete<any>(
            `${environment.baseApiUrl}/${endpoint}/${key}`
          ).pipe(
            map((result: any) => {
              notify({
                message: 'Kayıt silme işlemi başarıyla tamamlanmıştır',
                type: 'success',
                displayTime: 5000
              });
              return result.response;
            }
            ))
        ).catch((result) => {
          notifyError(result);
        });
      }
    });


    function notifyError(result: any) {
      notify({
        message: `Hata : ${result.error}`,
        type: 'error',
        displayTime: 5000
      });
    }
  }
  protected key!: any;
  protected endpoint!: string;
  protected httpClient!: HttpClient;
  store!: CustomStore;

}
