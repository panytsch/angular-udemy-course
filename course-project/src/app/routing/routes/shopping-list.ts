import {Route} from '@angular/router';

import {IAppRoute} from './types';
import {ShoppingListComponent} from '../../shopping-list/shopping-list.component';

export class ShoppingListRoute implements IAppRoute {
  getRoute = (): Route => ({
    path: '',
    component: ShoppingListComponent
  })

}
