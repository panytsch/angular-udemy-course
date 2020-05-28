import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {IShoppingListState} from './store/shopping-list.reducer';
import {StartEditAction} from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<IShoppingListState>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
  }

  onEdit(i: number) {
    this.store.dispatch(new StartEditAction(i));
  }
}
