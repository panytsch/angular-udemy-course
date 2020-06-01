import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export enum RecipeActions {
  SetERecipes = '[Recipe] set recipes'
}

export class SetRecipesAction implements Action {
  readonly type = RecipeActions.SetERecipes;

  constructor(public recipes: Recipe[]) {
  }
}

export type RecipeActionsType = SetRecipesAction
  ;
