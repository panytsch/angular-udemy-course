import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListActions, ShoppingListActionType} from './shopping-list.actions';

const initialState: IShoppingListState = {
  ingredients: [
    new Ingredient('Bread', 3),
    new Ingredient('Pineapple', 44),
    new Ingredient('Tomatoes', 4),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: IShoppingListState = initialState, action: ShoppingListActionType) {
  switch (action.type) {
    case ShoppingListActions.addIngredient:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      };
    case ShoppingListActions.addIngredients:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients]
      };
    case ShoppingListActions.deleteIngredient:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
        ingredients: state.ingredients.filter((_, i) => i !== state.editedIngredientIndex)
      };
    case ShoppingListActions.updateIngredient:
      const updatedIngredient = {
        ...state.ingredients[state.editedIngredientIndex],
        ...action.ingredient
      };
      const updatedIngredients = state.ingredients.slice();
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.startEdit:
      return {
        ...state,
        editedIngredientIndex: action.index,
        editedIngredient: {...state.ingredients[action.index]}
      };
    case ShoppingListActions.stopEdit:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}

export interface IShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}
