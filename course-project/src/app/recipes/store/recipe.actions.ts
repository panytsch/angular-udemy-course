import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';

export enum RecipeActions {
  SetRecipes = '[Recipe] set recipes',
  FetchRecipes = '[Recipe] fetch recipes',
  AddRecipe = '[Recipe] AddRecipe',
  UpdateRecipe = '[Recipe] UpdateRecipe',
  DeleteRecipe = '[Recipe] DeleteRecipe',
  StoreRecipes = '[Recipe] StoreRecipes',
}

export class SetRecipesAction implements Action {
  readonly type = RecipeActions.SetRecipes;

  constructor(public recipes: Recipe[]) {
  }
}

export class StoreRecipesAction implements Action {
  readonly type = RecipeActions.StoreRecipes;
}

export class AddRecipeAction implements Action {
  readonly type = RecipeActions.AddRecipe;

  constructor(public recipe: Recipe) {
  }
}

export class UpdateRecipeAction implements Action {
  readonly type = RecipeActions.UpdateRecipe;

  constructor(public recipe: Recipe, public index: number) {
  }
}

export class DeleteRecipeAction implements Action {
  readonly type = RecipeActions.DeleteRecipe;

  constructor(public index: number) {
  }
}

export class FetchRecipesAction implements Action {
  readonly type = RecipeActions.FetchRecipes;
}

export type RecipeActionsType = SetRecipesAction
  | FetchRecipesAction
  | AddRecipeAction
  | UpdateRecipeAction
  | DeleteRecipeAction
  | StoreRecipesAction
  ;
