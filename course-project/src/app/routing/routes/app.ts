import {Route} from '@angular/router';

import {IAppRoute, StaticRoutesEnum} from './types';

export class AppRoute implements IAppRoute {
  getRoute = (): Route => ({
    path: StaticRoutesEnum.App.substr(1),
    redirectTo: StaticRoutesEnum.Recipe,
    pathMatch: 'full'
  })
}
