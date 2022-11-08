import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexComponent} from './index.component';
import {RouterModule} from '@angular/router';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {PipeModule} from '../pipe/pipe.module';
import {KlassSelectModule} from '../../klass/klass-select/klass-select.module';

/**
 * 用户管理首页
 */

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule,
    PipeModule,
    KlassSelectModule
  ],
  exports: [
    IndexComponent
  ]
})
export class IndexModule { }
