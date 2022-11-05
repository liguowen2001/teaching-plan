import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MajorSelectComponent } from './major-select.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Select2Module} from '../../share/select2/select2.module';



@NgModule({
  declarations: [
    MajorSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Select2Module
  ],exports: [
    MajorSelectComponent
  ]
})
export class MajorSelectModule { }
