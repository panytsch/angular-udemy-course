import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private _count = 0;
  private _countActive = 0;
  private _countInactive = 0;

  constructor(private logger: LoggerService) {
  }

  public countActive() {
    this.logger.log('new active count', ++this._countActive);
    this.count();
  }

  public countInactive() {
    this.logger.log('new inactive count', ++this._countInactive);
    this.count();
  }

  private count(): void {
    this.logger.log('new count', ++this._count);
  }
}
