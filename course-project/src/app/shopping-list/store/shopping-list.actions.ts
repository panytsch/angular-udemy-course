import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export enum ShoppingListActions {
  addIngredient = 'ADD_INGREDIENT'
}

export class AddIngredientAction implements Action {
  readonly type = ShoppingListActions.addIngredient;

  constructor(public ingredient: Ingredient) {
  }
}
