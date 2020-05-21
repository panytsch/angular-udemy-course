import {getRouterPathFromParentRouteEnum, getRouterPathFromRouteEnum, IAppRoute, StaticRoutesEnum} from './types';
import {Route} from '@angular/router';
import {RecipesComponent} from '../../recipes/recipes.component';
import {NoSelectedRecipesComponent} from '../../recipes/no-selected-recipes/no-selected-recipes.component';
import {RecipeDetailComponent} from '../../recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from '../../recipes/recipe-edit/recipe-edit.component';

export class RecipeRoute implements IAppRoute {
  getRoute = (): Route => ({
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.Recipe),
    component: RecipesComponent,
    children: [
      (new NoSelectedRecipeRoute()).getRoute(),
      (new EditRecipeRoute()).getRoute(),
      (new NewRecipeRoute()).getRoute(),
      (new SelectedRecipeRoute()).getRoute(),
    ]
  })
}

class NoSelectedRecipeRoute implements IAppRoute {
  getRoute = (): Route => ({
    path: getRouterPathFromParentRouteEnum(StaticRoutesEnum.RecipeNoSelected, StaticRoutesEnum.Recipe),
    component: NoSelectedRecipesComponent
  })
}

export class SelectedRecipeRoute implements IAppRoute {
  static getLink = (id: number): string => StaticRoutesEnum.RecipeSelected.replace(':id', id.toString());

  getRoute = (): Route => ({
    path: getRouterPathFromParentRouteEnum(StaticRoutesEnum.RecipeSelected, StaticRoutesEnum.Recipe),
    component: RecipeDetailComponent
  })
}

export class NewRecipeRoute implements IAppRoute {
  static getLink = (): string => StaticRoutesEnum.RecipeNew;

  getRoute = (): Route => ({
    path: getRouterPathFromParentRouteEnum(StaticRoutesEnum.RecipeNew, StaticRoutesEnum.Recipe),
    component: RecipeEditComponent
  })
}

export class EditRecipeRoute implements IAppRoute {
  static getLink = (id: number): string => StaticRoutesEnum.RecipeEdit.replace(':id', id.toString());

  getRoute = (): Route => ({
    path: getRouterPathFromParentRouteEnum(StaticRoutesEnum.RecipeEdit, StaticRoutesEnum.Recipe),
    component: RecipeEditComponent
  })
}
