import {Action} from '@ngrx/store';

export enum AuthActions {
  Logout = 'LOGOUT',
  Login = 'LOGIN',
}

export class LogoutAction implements Action {
  readonly type = AuthActions.Logout;
}

export class LoginAction implements Action {
  readonly type = AuthActions.Login;

  constructor(
    public email: string,
    public id: string,
    public token: string,
    public tokenExpirationDate: Date
  ) {
  }
}

export type AuthActionType = LogoutAction | LoginAction;
