import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Bread', 3),
    new Ingredient('Pineapple', 44),
    new Ingredient('Tomatoes', 4),
  ];
  public ingredientsChanged = new Subject<Ingredient[]>();
  public ingredientToEditChanged = new Subject<number>();

  get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  public patchIngredient(index: number, ingredient: Ingredient): void {
    this._ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients);
  }

  public removeIngredient(index: number): void {
    this._ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients);
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this._ingredients = [...this._ingredients, ...ingredients];
    this.ingredientsChanged.next(this.ingredients);
  }

  constructor() {
  }
}
