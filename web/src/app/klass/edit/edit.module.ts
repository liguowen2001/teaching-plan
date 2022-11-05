import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MajorSelectModule} from '../../major/major-select/major-select.module';



@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MajorSelectModule
  ]
})
export class EditModule { }
