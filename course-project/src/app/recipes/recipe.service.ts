import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {Ingredient} from '../shared/ingredient.model';
import {AddIngredientsAction} from '../shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>();

  private _recipes: Recipe[] = [];

  constructor(private store: Store<IAppState>) {
  }

  get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  public getRecipeById(id: number): Recipe | null {
    return this.recipes[id] || null;
  }

  public addRecipe(rec: Recipe): void {
    this._recipes.push(rec);
    this.triggerUpdateRecipes();
  }

  public updateRecipe(index: number, rec: Recipe): void {
    this._recipes[index] = rec;
    this.triggerUpdateRecipes();
  }

  public deleteRecipe(index: number): void {
    this._recipes.splice(index, 1);
    this.triggerUpdateRecipes();
  }

  public setRecipes(recipes: Recipe[]): void {
    this._recipes = recipes;
    this.recipesUpdated.next(this.recipes);
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.store.dispatch(new AddIngredientsAction(ingredients));
  }

  private triggerUpdateRecipes() {
    console.log(this._recipes);
    this.recipesUpdated.next(this.recipes);
  }
}
