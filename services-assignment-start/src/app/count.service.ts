import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private _count = 0;

  constructor(private logger: LoggerService) {
  }

  count(): void {
    ++this._count;
    this.logger.log('new count', this._count);
  }
}
