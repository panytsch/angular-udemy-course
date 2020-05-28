import {Action} from '@ngrx/store';

import {Ingredient} from '../../shared/ingredient.model';
import {AddIngredientAction, ShoppingListActions} from './shopping-list.actions';

const initialState: IShoppingListState = {
  ingredients: [
    new Ingredient('Bread', 3),
    new Ingredient('Pineapple', 44),
    new Ingredient('Tomatoes', 4),
  ]
};

export function shoppingListReducer(state: IShoppingListState = initialState, action: Action) {
  switch (action.type) {
    case ShoppingListActions.addIngredient:
      return {
        ...state,
        ingredients: [...state.ingredients, (action as AddIngredientAction).ingredient]
      };
    default:
      return state;
  }
}

export interface IShoppingListState {
  ingredients: Ingredient[];
}
