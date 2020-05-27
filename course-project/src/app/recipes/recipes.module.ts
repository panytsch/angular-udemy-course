import {NgModule} from '@angular/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipesComponent} from './recipes.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NoSelectedRecipesComponent} from './no-selected-recipes/no-selected-recipes.component';
import {SharedModule} from '../shared/shared.module';
import {RecipeRoute} from '../routing/routes/recipe';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    NoSelectedRecipesComponent
  ],
  exports: [
    RecipesComponent,
  ],
  imports: [
    RouterModule.forChild([new RecipeRoute().getRoute()]),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule {
}
