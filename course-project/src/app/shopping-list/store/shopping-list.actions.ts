import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export enum ShoppingListActions {
  addIngredient = 'ADD_INGREDIENT',
  addIngredients = 'ADD_INGREDIENTS',
  updateIngredient = 'UPDATE_INGREDIENTS',
  deleteIngredient = 'DELETE_INGREDIENTS',
  startEdit = 'START_EDIT',
  stopEdit = 'STOP_EDIT',
}

export class AddIngredientAction implements Action {
  readonly type = ShoppingListActions.addIngredient;

  constructor(public ingredient: Ingredient) {
  }
}

export class AddIngredientsAction implements Action {
  readonly type = ShoppingListActions.addIngredients;

  constructor(public ingredients: Ingredient[]) {
  }
}

export class UpdateIngredientAction implements Action {
  readonly type = ShoppingListActions.updateIngredient;

  constructor(public ingredient: Ingredient) {
  }
}

export class DeleteIngredientAction implements Action {
  readonly type = ShoppingListActions.deleteIngredient;
}

export class StartEditAction implements Action {
  readonly type = ShoppingListActions.startEdit;

  constructor(public index: number) {
  }
}

export class StopEditAction implements Action {
  readonly type = ShoppingListActions.stopEdit;
}

export type ShoppingListActionType = AddIngredientAction
  | UpdateIngredientAction
  | DeleteIngredientAction
  | StartEditAction
  | StopEditAction
  | AddIngredientsAction;
