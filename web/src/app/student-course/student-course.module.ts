import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from './index/index.module';
import {StudentCourseRoutingModule} from './student-course-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    StudentCourseRoutingModule
  ]
})
export class StudentCourseModule { }
