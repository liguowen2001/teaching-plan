import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlassCheckboxComponent } from './klass-checkbox.component';



@NgModule({
  declarations: [
    KlassCheckboxComponent
  ],
  exports: [
    KlassCheckboxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KlassCheckboxModule { }
