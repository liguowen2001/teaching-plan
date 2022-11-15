import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MajorSelectModule} from '../../major/major-select/major-select.module';
import {SemesterSelectModule} from '../../semester/semester-select/semester-select.module';
import {TeacherCheckboxModule} from '../../teacher/teacher-checkbox/teacher-checkbox.module';



@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MajorSelectModule,
    SemesterSelectModule,
    TeacherCheckboxModule
  ]
})
export class AddModule { }
