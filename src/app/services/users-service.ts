import { Injectable } from '@angular/core';
import { BaseService } from './infrastructure/service-base.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor() {
    super('users')
  }
  
}
