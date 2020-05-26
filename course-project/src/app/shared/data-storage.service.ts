import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  readonly recipesUrl = 'https://angular-course-b2154.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  public storeRecipes(): void {
    const recipes = this.recipeService.recipes;
    this.http.put(this.recipesUrl, recipes).subscribe(res => console.log(res));
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(this.recipesUrl)
      .pipe(
        map(recipes => recipes.map(recipe => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }))),
        tap((rec: Recipe[]) => {
          this.recipeService.setRecipes(rec);
        })
      );
  }
}
