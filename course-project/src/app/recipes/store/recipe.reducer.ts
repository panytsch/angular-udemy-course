import {Recipe} from '../recipe.model';
import {RecipeActions, RecipeActionsType} from './recipe.actions';

export interface IRecipeState {
  recipes: Recipe[];
}

const initialState: IRecipeState = {
  recipes: []
};

export function recipeReducer(state: IRecipeState = initialState, action: RecipeActionsType) {
  switch (action.type) {
    case RecipeActions.SetRecipes:
      return {
        ...state,
        recipes: [...action.recipes]
      };
    case RecipeActions.AddRecipe:
      return {
        ...state,
        recipes: [...state.recipes, {...action.recipe}]
      };
    case RecipeActions.DeleteRecipe:
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => action.index !== index)
      };
    case RecipeActions.UpdateRecipe:
      const newRecipes = state.recipes.slice();
      newRecipes[action.index] = {...action.recipe};
      return {
        ...state,
        recipes: newRecipes
      };
    default:
      return state;
  }
}
