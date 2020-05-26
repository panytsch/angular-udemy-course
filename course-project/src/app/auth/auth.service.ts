import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';
import {StaticRoutesEnum} from '../routing/routes/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urlSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private readonly urlSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  public userUpdated = new BehaviorSubject<User>(null);
  private logoutTimer: number;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public signUp(email: string, password: string): Observable<SingUpResponseData> {
    return this.http
      .post<SingUpResponseData>(this.urlSignUp, {email, password, returnSecureToken: true}, {
        params: new HttpParams().append('key', environment.firebaseKey)
      })
      .pipe(
        catchError(this.handleError),
        tap(res => this.handleLogin(res.email, res.localId, res.idToken, +res.expiresIn))
      );
  }

  public login(email: string, password: string): Observable<SingInResponseData> {
    return this.http
      .post<SingInResponseData>(this.urlSignIn, {email, password, returnSecureToken: true}, {
        params: new HttpParams().append('key', environment.firebaseKey)
      })
      .pipe(
        catchError(this.handleError),
        tap(res => this.handleLogin(res.email, res.localId, res.idToken, +res.expiresIn))
      );
  }

  public logout = (): void => {
    this.userUpdated.next(null);
    this.router.navigateByUrl(StaticRoutesEnum.Auth);
    this.saveUser(null);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  // in milliseconds
  public autoLogout(expiration: number): void {
    this.logoutTimer = setTimeout(this.logout, expiration);
  }

  public autoLogin(): void {
    const loadedUser = this.getSavedUser();
    if (!loadedUser.token) {
      return;
    }
    this.userUpdated.next(loadedUser);
    this.autoLogout(loadedUser.tokenExpirationDate.getTime() - new Date().getTime());
  }

  private getSavedUser(): User | null {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return null;
    }
    return new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData.__tokenExpirationDate)
    );
  }

  private saveUser(user?: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleLogin = (email: string, id: string, token: string, expiresIn: number) => {
    const expTime = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expTime);
    this.userUpdated.next(user);
    this.saveUser(user);
    this.autoLogout(expiresIn * 1000);
  }

  private handleError = (err: HttpErrorResponse): Observable<never> => {
    let error = '';
    if (!err.error.error || !err.error.error.message) {
      return throwError(error);
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
      default:
        error = 'Error happened';
    }
    return throwError(error);
  }
}

export interface SingInResponseData extends SingUpResponseData {
  registered: boolean;
}

export interface SingUpResponseData {
  idToken: string; // 	A Firebase Auth ID token for the newly created user.
  email: string; // The email for the newly created user.
  refreshToken: string; // 	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; // 	The number of seconds in which the ID token expires.
  localId: string;
}
