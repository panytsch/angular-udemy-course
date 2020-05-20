import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipeRoute} from './routes/recipe';
import {ShoppingListRoute} from './routes/shopping-list';
import {AppRoute} from './routes/app';

const appRoutes: Routes = [
  (new AppRoute()).getRoute(),
  (new RecipeRoute()).getRoute(),
  (new ShoppingListRoute()).getRoute(),
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
