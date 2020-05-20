import {Route} from '@angular/router';

import {getRouterPathFromRouteEnum, IAppRoute, StaticRoutesEnum} from './types';
import {ShoppingListComponent} from '../../shopping-list/shopping-list.component';

export class ShoppingListRoute implements IAppRoute {
  getRoute = (): Route => ({
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.ShoppingList),
    component: ShoppingListComponent
  })

}
