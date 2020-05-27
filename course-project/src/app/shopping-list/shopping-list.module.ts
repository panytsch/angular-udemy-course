import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ShoppingListRoute} from '../routing/routes/shopping-list';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  exports: [
    ShoppingListComponent,
  ],
  imports: [
    RouterModule.forChild([new ShoppingListRoute().getRoute()]),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ShoppingListModule {
}
