import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './reactive-form.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ReactiveFormComponent],
  exports: [
    ReactiveFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ReactiveFormModule { }
