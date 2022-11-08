import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {EditModule} from './edit/edit.module';
import {AddModule} from './add/add.module';
import {IndexModule} from './index/index.module';

/**
 * 用户管理
 */

@NgModule({
  declarations: [

  ],
  exports: [
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    IndexModule,
    EditModule,
    AddModule
  ]
})
export class TeacherModule {
}
