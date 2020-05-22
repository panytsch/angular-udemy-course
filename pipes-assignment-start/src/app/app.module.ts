import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe';
import { ServerSortPipe } from './server-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    ServerSortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export interface Server {
  instanceType: string;
  name: string;
  status: string;
  started: Date;
}
