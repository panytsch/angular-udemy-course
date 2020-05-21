import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangedSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
    console.log('built');
  }

  ngOnInit(): void {
    console.log('inited');
    this.ingredients = this.shoppingListService.ingredients;
    this.ingredientsChangedSubs = this.shoppingListService.ingredientsChanged
      .subscribe((ing: Ingredient[]) => this.ingredients = ing);
  }

  ngOnDestroy() {
    this.ingredientsChangedSubs.unsubscribe();
  }
}
