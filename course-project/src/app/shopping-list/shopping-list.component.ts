import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppStore} from '../store';
import {IShoppingListState} from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<IShoppingListState>;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<IAppStore>) {
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
  }

  onEdit(i: number) {
    this.shoppingListService.ingredientToEditChanged.next(i);
  }
}
