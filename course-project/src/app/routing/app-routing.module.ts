import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipeRoute} from './routes/recipe';
import {ShoppingListRoute} from './routes/shopping-list';

const appRoutes: Routes = [
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
