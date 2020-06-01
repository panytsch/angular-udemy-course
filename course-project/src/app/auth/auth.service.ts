import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {LogoutAction} from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logoutTimer: any;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<IAppState>) {
  }

  // in milliseconds
  public setLogoutTimer = (expiration: number): void => {
    this.logoutTimer = setTimeout(() => this.store.dispatch(new LogoutAction()), expiration);
  }

  public clearLogoutTimer = (): void => {
    if (!this.logoutTimer) {
      return;
    }
    clearTimeout(this.logoutTimer);
    this.logoutTimer = null;
  }
}
