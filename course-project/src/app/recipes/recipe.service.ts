import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private prRecipes: Recipe[] = [
    new Recipe(
      'burger big',
      'mac',
      'https://i3.stat01.com/2/745/107442723/a35910/doski-dlya-burgerov.jpg',
      [
        new Ingredient('meat', 2),
        new Ingredient('bread', 3),
        new Ingredient('onion', 1),
        new Ingredient('cheese', 2),
      ]
    ),
    new Recipe(
      'burger small',
      'small mac burger',
      'https://i3.stat01.com/2/745/107442743/a35910/podnosy-dlya-burgerov.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('bread', 1),
      ]
    ),
  ];

  public recipeSelected = new EventEmitter<Recipe>();

  get recipes(): Recipe[] {
    return this.prRecipes.slice();
  }

  public getRecipeById(id: number): Recipe | null {
    return this.recipes[id] || null;
  }

  constructor() {
  }
}
