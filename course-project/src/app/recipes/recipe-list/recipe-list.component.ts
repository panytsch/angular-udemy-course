import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {NewRecipeRoute} from '../../routing/routes/recipe';
import {Subscription} from 'rxjs';
import {IAppState} from '../../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipesUpdatedSubs: Subscription;
  newRecipeLink: string;

  constructor(private store: Store<IAppState>) {
    this.newRecipeLink = NewRecipeRoute.getLink();
  }

  recipes: Recipe[];

  ngOnInit(): void {
    this.recipesUpdatedSubs = this.store.select('recipes')
      .pipe(
        map(state => state.recipes)
      )
      .subscribe(res => this.recipes = res);
  }

  ngOnDestroy() {
    this.recipesUpdatedSubs.unsubscribe();
  }
}
