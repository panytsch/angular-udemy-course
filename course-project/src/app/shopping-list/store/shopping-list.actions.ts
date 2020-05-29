import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export enum ShoppingListActions {
  addIngredient = '[Shopping list] ADD_INGREDIENT',
  addIngredients = '[Shopping list] ADD_INGREDIENTS',
  updateIngredient = '[Shopping list] UPDATE_INGREDIENTS',
  deleteIngredient = '[Shopping list] DELETE_INGREDIENTS',
  startEdit = '[Shopping list] START_EDIT',
  stopEdit = '[Shopping list] STOP_EDIT',
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
