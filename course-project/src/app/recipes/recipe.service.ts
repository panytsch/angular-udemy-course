import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private prRecipes: Recipe[] = [
    new Recipe('burger1', 'mac', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1035715_11.jpg?itok=urBA2ZBD'),
    new Recipe('burger2', 'mac', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1035715_11.jpg?itok=urBA2ZBD'),
  ];

  public recipeSelected = new EventEmitter<Recipe>();

  get recipes(): Recipe[] {
    return this.prRecipes.slice();
  }

  constructor() {
  }
}
