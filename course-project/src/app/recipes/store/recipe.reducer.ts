import {Recipe} from '../recipe.model';
import {RecipeActions, SetRecipesAction} from './recipe.actions';

export interface IRecipeState {
  recipes: Recipe[];
}

const initialState: IRecipeState = {
  recipes: []
};

export function recipeReducer(state: IRecipeState = initialState, action: SetRecipesAction) {
  switch (action.type) {
    case RecipeActions.SetERecipes:
      return {
        ...state,
        recipes: [...action.recipes]
      };
    default:
      return state;
  }
}
