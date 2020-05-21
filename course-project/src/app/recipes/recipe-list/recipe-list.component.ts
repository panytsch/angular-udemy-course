import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {NewRecipeRoute} from '../../routing/routes/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  newRecipeLink: string;

  constructor(private recipeService: RecipeService) {
    this.newRecipeLink = NewRecipeRoute.getLink();
  }

  recipes: Recipe[];

  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
  }
}
