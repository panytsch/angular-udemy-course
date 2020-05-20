import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StaticRoutesEnum} from '../../routing/routes/types';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    const recipe = this.recipeService.getRecipeById(id);
    if (!recipe) {
      this.router.navigateByUrl(StaticRoutesEnum.Recipe);
      return;
    }
    this.recipe = recipe;
    this.route.params.subscribe(this.loadNext);
  }

  private loadNext = (params: Params): void => {
    const recipe = this.recipeService.getRecipeById(+params.id);
    if (!recipe) {
      this.router.navigateByUrl(StaticRoutesEnum.Recipe);
      return;
    }
    this.recipe = recipe;
  }

  toShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
