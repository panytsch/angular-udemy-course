import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  AuthActions,
  AuthenticateFailAction,
  AuthenticateSuccessAction, DummyIgnoreAction,
  LoginStartAction, LogoutAction,
  SignUpStartAction
} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {StaticRoutesEnum} from '../../routing/routes/types';
import {User} from '../user.model';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  @Effect({dispatch: false})
  authLogout: Observable<LogoutAction>;
  @Effect()
  authSignUp: Observable<AuthenticateSuccessAction | AuthenticateFailAction>;
  @Effect()
  authLogin: Observable<AuthenticateSuccessAction | AuthenticateFailAction>;
  @Effect({dispatch: false})
  authRedirect: Observable<AuthenticateSuccessAction>;
  @Effect()
  authAutoLogin: Observable<AuthenticateSuccessAction | DummyIgnoreAction>;

  private readonly urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly urlSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

  constructor(private actions: Actions,
              private router: Router,
              private http: HttpClient,
              private authService: AuthService) {
    this.initEffects();
  }

  private initEffects() {
    this.authLogin = this.actions.pipe(
      ofType(AuthActions.LoginStart),
      switchMap(this.sendLoginRequest)
    );
    this.authRedirect = this.actions.pipe(
      ofType(AuthActions.AuthenticateSuccess),
      tap((action: AuthenticateSuccessAction) => {
        if (!action.redirect) {
          return;
        }
        this.router.navigateByUrl(StaticRoutesEnum.App);
      })
    );
    this.authSignUp = this.actions.pipe(
      ofType(AuthActions.SignUpStart),
      switchMap(this.sendSignUpRequest)
    );
    this.authLogout = this.actions.pipe(
      ofType(AuthActions.Logout),
      tap(() => {
        this.authService.clearLogoutTimer();
        this.saveUser(null);
        this.router.navigateByUrl(StaticRoutesEnum.Auth);
      })
    );
    this.authAutoLogin = this.actions.pipe(
      ofType(AuthActions.AutoLogin),
      map(this.autoLogin)
    );
  }

  private sendLoginRequest = (authData: LoginStartAction) => this.http
    .post<AuthenticationResponseData>(this.urlSignIn, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }, {
      params: new HttpParams().append('key', environment.firebaseKey)
    })
    .pipe(
      tap((resData: AuthenticationResponseData) => {
        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
      }),
      map(this.handleAuthentication),
      catchError(this.handleError)
    )

  private handleAuthentication = (resData: AuthenticationResponseData)
    : AuthenticateSuccessAction => {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + +resData.expiresIn);
    this.saveUser(new User(resData.email, resData.localId, resData.idToken, expirationDate));
    return new AuthenticateSuccessAction(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate,
      true
    );
  }

  private sendSignUpRequest = (authData: SignUpStartAction) => this.http
    .post<AuthenticationResponseData>(this.urlSignUp, {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    }, {
      params: new HttpParams().append('key', environment.firebaseKey)
    })
    .pipe(
      tap((resData: AuthenticationResponseData) => {
        this.authService.setLogoutTimer(+resData.expiresIn * 1000);
      }),
      map(this.handleAuthentication),
      catchError(this.handleError)
    )

  private handleError = (err: HttpErrorResponse): Observable<AuthenticateFailAction> => {
    let error = 'Unexpected error';
    if (!err.error.error || !err.error.error.message) {
      return of(new AuthenticateFailAction(error));
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'Email already exist';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'Email doesn\'t exist';
        break;
      case 'INVALID_PASSWORD':
        error = 'Wrong password';
        break;
    }
    return of(new AuthenticateFailAction(error));
  }

  public autoLogin = (): AuthenticateSuccessAction | DummyIgnoreAction => {
    const loadedUser = this.getSavedUser();
    if (!loadedUser) {
      return new DummyIgnoreAction();
    }
    const tokenExpirationDate = new Date(loadedUser._tokenExpirationDate);
    const user = new User(loadedUser.email, loadedUser.id, loadedUser._token, tokenExpirationDate);
    if (!user.token) {
      return new DummyIgnoreAction();
    }
    this.authService.setLogoutTimer(tokenExpirationDate.getTime() - new Date().getTime());
    return new AuthenticateSuccessAction(
      user.email,
      user.id,
      user.token,
      tokenExpirationDate,
      false
    );
  }

  // noinspection JSMethodCanBeStatic
  private getSavedUser = (): any => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return null;
    }
    return userData;
  }

  // noinspection JSMethodCanBeStatic
  private saveUser = (user?: User): void => {
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

export interface AuthenticationResponseData {
  idToken: string; // 	A Firebase Auth ID token for the newly created user.
  email: string; // The email for the newly created user.
  refreshToken: string; // 	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; // 	The number of seconds in which the ID token expires.
  localId: string;
  registered?: boolean;
}

