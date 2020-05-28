import {IShoppingListState, shoppingListReducer} from '../shopping-list/store/shopping-list.reducer';
import {authReducer, IAuthState} from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

class AppReducers implements ActionReducerMap<IAppState> {
  shoppingList = shoppingListReducer;
  auth = authReducer;
}

export const appReducer = new AppReducers();

export interface IAppState {
  shoppingList: IShoppingListState;
  auth: IAuthState;
}
