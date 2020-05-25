import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesUpdated = new Subject<Recipe[]>();

  private prRecipes: Recipe[] = [];

  /*
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
  */

  constructor() {
  }

  get recipes(): Recipe[] {
    return this.prRecipes.slice();
  }

  public getRecipeById(id: number): Recipe | null {
    return this.recipes[id] || null;
  }

  public addRecipe(rec: Recipe): void {
    this.prRecipes.push(rec);
    this.triggerUpdateRecipes();
  }

  public updateRecipe(index: number, rec: Recipe): void {
    this.prRecipes[index] = rec;
    this.triggerUpdateRecipes();
  }

  public deleteRecipe(index: number): void {
    this.prRecipes.splice(index, 1);
    this.triggerUpdateRecipes();
  }

  public setRecipes(recipes: Recipe[]): void {
    this.prRecipes = recipes;
    this.recipesUpdated.next(this.recipes);
  }

  private triggerUpdateRecipes() {
    this.recipesUpdated.next(this.recipes);
  }
}
