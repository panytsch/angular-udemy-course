import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {AuthRoute} from '../routing/routes/auth';

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([new AuthRoute().getRoute()]),
    SharedModule
  ]
})
export class AuthModule {
}
