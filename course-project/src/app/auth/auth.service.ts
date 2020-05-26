import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

  constructor(private http: HttpClient) {
  }

  public signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.url, {email, password, returnSecureToken: true}, {
      params: new HttpParams().append('key', environment.firebaseKey)
    }).pipe(catchError((err: HttpErrorResponse) => {
      let error = '';
      if (!err.error.error || !err.error.error.message) {
        return throwError(error);
      }
      switch (err.error.error.message) {
        case 'EMAIL_EXISTS':
          error = 'Email already exist';
          break;
        default:
          error = 'Error happened';
      }
      return throwError(error);
    }));
  }
}

export interface AuthResponseData {
  idToken: string; // 	A Firebase Auth ID token for the newly created user.
  email: string; // The email for the newly created user.
  refreshToken: string; // 	A Firebase Auth refresh token for the newly created user.
  expiresIn: string; // 	The number of seconds in which the ID token expires.
  localId: string;
}
