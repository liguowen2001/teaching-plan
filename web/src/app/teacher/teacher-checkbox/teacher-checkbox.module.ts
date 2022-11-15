import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherCheckboxComponent } from './teacher-checkbox.component';



@NgModule({
  declarations: [
    TeacherCheckboxComponent
  ],
  exports: [
    TeacherCheckboxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TeacherCheckboxModule { }
