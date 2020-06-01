import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {SetRecipesAction} from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  readonly recipesUrl = 'https://angular-course-b2154.firebaseio.com/recipes.json';

  constructor(private http: HttpClient,
              private store: Store<IAppState>,
              private recipeService: RecipeService) {
  }

  public storeRecipes(): void {
    const recipes = this.recipeService.recipes;
    this.http.put(this.recipesUrl, recipes).subscribe(console.log);
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
          this.store.dispatch(new SetRecipesAction(rec));
        })
      );
  }
}
