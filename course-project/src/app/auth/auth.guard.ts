import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import {StaticRoutesEnum} from '../routing/routes/types';
import {IAppState} from '../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private state: Store<IAppState>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): Observable<boolean
    | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.state.select('auth').pipe(
      take(1),
      map(state => state && state.user),
      map(user => {
      if (user) {
        return true;
      }
      return this.router.createUrlTree([StaticRoutesEnum.Auth]);
    })
    );
  }

}
