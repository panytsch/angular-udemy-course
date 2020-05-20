import {getRouterPathFromParentRouteEnum, getRouterPathFromRouteEnum, IAppRoute, StaticRoutesEnum} from './types';
import {Route} from '@angular/router';
import {RecipesComponent} from '../../recipes/recipes.component';
import {NoSelectedRecipesComponent} from '../../recipes/no-selected-recipes/no-selected-recipes.component';
import {RecipeDetailComponent} from '../../recipes/recipe-detail/recipe-detail.component';

export class RecipeRoute implements IAppRoute {
  getRoute = (): Route => ({
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.Recipe),
    component: RecipesComponent,
    children: [
      (new NoSelectedRecipeRoute()).getRoute(),
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
