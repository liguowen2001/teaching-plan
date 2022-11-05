import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemesterSelectComponent } from './semester-select.component';
import {Select2Module} from '../../share/select2/select2.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    SemesterSelectComponent
  ],
  exports: [
    SemesterSelectComponent
  ],
  imports: [
    CommonModule,
    Select2Module,
    ReactiveFormsModule
  ]
})
export class SemesterSelectModule { }
