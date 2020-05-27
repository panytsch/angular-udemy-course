import {IAppRoute, StaticRoutesEnum} from './types';
import {Route} from '@angular/router';
import {AuthComponent} from '../../auth/auth.component';

export class AuthRoute implements IAppRoute {
  static getLink = (): string => StaticRoutesEnum.Auth;

  getRoute = (): Route => ({
    path: '',
    component: AuthComponent,
  })
}
