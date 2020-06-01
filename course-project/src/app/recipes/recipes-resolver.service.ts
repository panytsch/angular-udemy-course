import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/app.reducer';
import {FetchRecipesAction, RecipeActions} from './store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from 'rxjs/operators';
import {IRecipeState} from './store/recipe.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<IAppState>,
              private actions: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.store.select('recipes')
      .pipe(
        take(1),
        map((recipeState: IRecipeState) => recipeState.recipes),
        switchMap((recipes: Recipe[]) => {
          if (recipes.length === 0) {
            this.store.dispatch(new FetchRecipesAction());
            return this.actions
              .pipe(
                ofType(RecipeActions.SetRecipes),
                take(1)
              );
          }
          return of(recipes);
        })
      );
  }
}
