import {IShoppingListState, shoppingListReducer} from '../shopping-list/store/shopping-list.reducer';
import {authReducer, IAuthState} from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {IRecipeState, recipeReducer} from '../recipes/store/recipe.reducer';

class AppReducers implements ActionReducerMap<IAppState> {
  shoppingList = shoppingListReducer;
  auth = authReducer;
  recipes = recipeReducer;
}

export const appReducer = new AppReducers();

export interface IAppState {
  shoppingList: IShoppingListState;
  auth: IAuthState;
  recipes: IRecipeState;
}
