import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private prIngredients: Ingredient[] = [
    new Ingredient('Bread', 3),
    new Ingredient('Pineapple', 44),
    new Ingredient('Tomatoes', 4),
  ];

  get ingredients(): Ingredient[] {
    return this.prIngredients;
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  constructor() {
  }
}
