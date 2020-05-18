import {Injectable} from '@angular/core';
import {CountService} from './count.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private countService: CountService) {
  }

  setToInactive(id: number): void {
    this.countService.count();
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
  }

  setToActive(id: number): void {
    this.countService.count();
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
  }
}
