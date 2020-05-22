import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {NewRecipeRoute} from '../../routing/routes/recipe';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private recipesUpdatedSubs: Subscription;
  newRecipeLink: string;

  constructor(private recipeService: RecipeService) {
    this.newRecipeLink = NewRecipeRoute.getLink();
  }

  recipes: Recipe[];

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.recipesUpdatedSubs = this.recipeService.recipesUpdated.subscribe(res => this.recipes = res);
  }

  ngOnDestroy() {
    this.recipesUpdatedSubs.unsubscribe();
  }
}
