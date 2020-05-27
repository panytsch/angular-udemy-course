import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoute} from './routes/app';
import {getRouterPathFromRouteEnum, StaticRoutesEnum} from './routes/types';

const appRoutes: Routes = [
  new AppRoute().getRoute(),
  {
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.Recipe),
    loadChildren: () => import('./../recipes/recipes.module').then(m => m.RecipesModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
