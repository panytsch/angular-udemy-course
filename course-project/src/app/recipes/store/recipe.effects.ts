import {Actions, Effect, ofType} from '@ngrx/effects';
import {RecipeActions, SetRecipesAction} from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IAppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  readonly recipesUrl = 'https://angular-course-b2154.firebaseio.com/recipes.json';
  @Effect()
  fetchRecipes: Observable<SetRecipesAction>;
  @Effect({dispatch: false})
  storeRecipes;

  constructor(private actions: Actions,
              private http: HttpClient,
              private store: Store<IAppState>) {
    this.initEffects();
  }

  private initEffects(): void {
    this.fetchRecipes = this.actions
      .pipe(
        ofType(RecipeActions.FetchRecipes),
        switchMap(() => this.http
          .get<Recipe[]>(this.recipesUrl)),
        map((recipes: Recipe[]) => recipes.map(recipe => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }))),
        map((recipes: Recipe[]) => new SetRecipesAction(recipes))
      );

    this.storeRecipes = this.actions
      .pipe(
        ofType(RecipeActions.StoreRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipesState]) => this.http.put(this.recipesUrl, recipesState.recipes))
      );
  }
}
