import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MajorSelectModule} from '../../major/major-select/major-select.module';
import {DateModule} from '../../share/component/date/date.module';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MajorSelectModule,
    DateModule
  ]
})
export class AddModule { }
