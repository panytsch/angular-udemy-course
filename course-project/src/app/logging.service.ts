import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() {
  }

  public print(...args: any[]): void {
    console.log('LOGGING: ', ...args);
  }
}
