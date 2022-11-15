import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {NgModule} from '@angular/core';

/**
 * 用户模块路由
 * author: liguwoen
 */
const routs: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routs)],
  exports: [RouterModule]
})
export class StudentCourseRoutingModule {
}
