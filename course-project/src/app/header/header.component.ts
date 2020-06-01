import {Component, OnDestroy, OnInit} from '@angular/core';
import {StaticRoutesEnum} from '../routing/routes/types';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {map} from 'rxjs/operators';
import {LogoutAction} from '../auth/store/auth.actions';
import {FetchRecipesAction, StoreRecipesAction} from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  isAuthenticated = false;
  routes = StaticRoutesEnum;

  constructor(private authService: AuthService,
              private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.subs.push(this.store.select('auth')
      .pipe(
        map(state => state && state.user)
      )
      .subscribe(user => {
        this.isAuthenticated = !!user;
      }));
  }

  onSaveRecipes(): void {
    this.store.dispatch(new StoreRecipesAction());
  }

  onFetchRecipes(): void {
    this.store.dispatch(new FetchRecipesAction());
  }

  onLogout(): void {
    this.store.dispatch(new LogoutAction());
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
