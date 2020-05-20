import {Route} from '@angular/router';

import {IAppRoute, RoutesEnum} from './types';
import {ShoppingListComponent} from '../../shopping-list/shopping-list.component';

export class ShoppingListRoute implements IAppRoute{
  getRoute = (): Route => ({
    path: RoutesEnum.ShoppingList.substr(1),
    component: ShoppingListComponent
  })

}
