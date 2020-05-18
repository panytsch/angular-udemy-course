import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
    this.clearIngredient();
  }

  ngOnInit(): void {
  }

  onIngredientAdd = (): void => {
    if (!this.isIngredientValid()) {
      return;
    }
    this.shoppingListService.addIngredient(this.ingredient);
    this.clearIngredient();
  }

  onIngredientClear = (): void => {
    this.clearIngredient();
  }

  isIngredientValid = (): boolean => !!(this.ingredient.amount && this.ingredient.name);

  private clearIngredient = (): void => {
    this.ingredient = new Ingredient('', 0);
  }
}
