import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StaticRoutesEnum} from '../../routing/routes/types';
import {EditRecipeRoute} from '../../routing/routes/recipe';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editRecipeLink: string;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(this.loadNext);
  }

  private loadNext = (params: Params): void => {
    const recipe = this.recipeService.getRecipeById(+params.id);
    if (!recipe) {
      this.router.navigateByUrl(StaticRoutesEnum.Recipe);
      return;
    }
    this.id = +params.id;
    this.recipe = recipe;
    this.editRecipeLink = EditRecipeRoute.getLink(this.id);
  }

  toShoppingList(): void {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
