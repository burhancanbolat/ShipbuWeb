import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class TransportDashboardService extends BaseService {

  constructor() {
    super("transportdashboard");
  }

}
