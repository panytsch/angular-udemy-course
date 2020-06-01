import {Action} from '@ngrx/store';

export enum AuthActions {
  Logout = '[AUTH] Logout',
  AuthenticateSuccess = '[AUTH] AuthenticateSuccess',
  AutoLogin = '[AUTH] AUTO LOGIN',
  LoginStart = '[AUTH] LOGIN Start',
  SignUpStart = '[AUTH] SignUp Start',
  AuthenticateFail = '[AUTH] LOGIN Fail',
  ClearError = '[AUTH] clear error',
  DummyIgnore = '[AUTH] ignore this action'
}

export class AutoLoginAction implements Action {
  readonly type = AuthActions.AutoLogin;
}

export class ClearErrorAction implements Action {
  readonly type = AuthActions.ClearError;
}

export class LogoutAction implements Action {
  readonly type = AuthActions.Logout;
}

export class SignUpStartAction implements Action {
  readonly type = AuthActions.SignUpStart;

  constructor(public email: string,
              public password: string) {
  }
}

export class AuthenticateFailAction implements Action {
  readonly type = AuthActions.AuthenticateFail;

  constructor(public errorMessage: string) {
  }
}

export class AuthenticateSuccessAction implements Action {
  readonly type = AuthActions.AuthenticateSuccess;

  constructor(
    public email: string,
    public id: string,
    public token: string,
    public tokenExpirationDate: Date,
    public redirect: boolean
  ) {
  }
}

export class DummyIgnoreAction implements Action {
  readonly type = AuthActions.DummyIgnore;
}

export class LoginStartAction implements Action {
  readonly type = AuthActions.LoginStart;

  constructor(
    public email: string,
    public password: string) {
  }
}

export type AuthActionType = LogoutAction
  | LoginStartAction
  | SignUpStartAction
  | DummyIgnoreAction
  | AutoLoginAction
  | AuthenticateFailAction
  | AuthenticateSuccessAction
  | ClearErrorAction
  ;
