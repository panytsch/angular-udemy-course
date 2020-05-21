import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private prIngredients: Ingredient[] = [
    new Ingredient('Bread', 3),
    new Ingredient('Pineapple', 44),
    new Ingredient('Tomatoes', 4),
  ];
  public ingredientsChanged = new Subject<Ingredient[]>();

  get ingredients(): Ingredient[] {
    return this.prIngredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.prIngredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.prIngredients = [...this.prIngredients, ...ingredients];
    this.ingredientsChanged.next(this.ingredients);
  }

  constructor() {
  }
}
