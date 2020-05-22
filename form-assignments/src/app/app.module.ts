import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TdFormComponent} from './td-form/td-form.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormModule} from './reactive-form/reactive-form.module';

@NgModule({
  declarations: [
    AppComponent,
    TdFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
