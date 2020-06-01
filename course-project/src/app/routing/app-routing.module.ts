import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppRoute} from './routes/app';
import {getRouterPathFromRouteEnum, StaticRoutesEnum} from './routes/types';

const appRoutes: Routes = [
  new AppRoute().getRoute(),
  {
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.Recipe),
    loadChildren: () => import('./../recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.ShoppingList),
    loadChildren: () => import('./../shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
  },
  {
    path: getRouterPathFromRouteEnum(StaticRoutesEnum.Auth),
    loadChildren: () => import('./../auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
