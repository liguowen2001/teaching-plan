import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SemesterSelectModule} from '../../semester/semester-select/semester-select.module';
import {KlassCheckboxModule} from '../../klass/klass-checkbox/klass-checkbox.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SemesterSelectModule,
    KlassCheckboxModule
  ]
})
export class EditModule { }
