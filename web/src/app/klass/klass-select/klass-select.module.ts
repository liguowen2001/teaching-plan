import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KlassSelectComponent } from './klass-select.component';
import {Select2Module} from '../../share/select2/select2.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    KlassSelectComponent
  ],
  exports: [
    KlassSelectComponent
  ],
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule
  ]
})
export class KlassSelectModule { }
