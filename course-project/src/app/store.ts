import {IShoppingListState, shoppingListReducer} from './shopping-list/store/shopping-list.reducer';

export class AppReducers {
  shoppingList = shoppingListReducer;
}

export interface IAppState {
  shoppingList: IShoppingListState;
}
