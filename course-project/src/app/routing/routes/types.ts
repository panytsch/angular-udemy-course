import {Route} from '@angular/router';

export interface IAppRoute {
  getRoute: () => Route;
}

export enum RoutesEnum {
  App = '/',
  Recipe = '/recipe',
  ShoppingList = '/shopping-list'
}
