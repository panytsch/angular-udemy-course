import {Route} from '@angular/router';

export interface IAppRoute {
  getRoute: () => Route;
}

export enum StaticRoutesEnum {
  App = '/',
  Recipe = '/recipes',
  RecipeNoSelected = '/recipes',
  RecipeSelected = '/recipes/:id',
  RecipeEdit = '/recipes/:id/edit',
  RecipeNew = '/recipes/new',
  ShoppingList = '/shopping-list',
  Auth = '/auth'
}

export const getRouterPathFromRouteEnum = (route: StaticRoutesEnum): string => route.substr(1);

export const getRouterPathFromParentRouteEnum = (route: StaticRoutesEnum,
                                                 parentRoute: StaticRoutesEnum
): string => route.substr(parentRoute.length + 1);
