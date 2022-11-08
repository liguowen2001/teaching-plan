import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddComponent} from './add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KlassSelectModule} from '../../klass/klass-select/klass-select.module';

/**
 * 用户管理新增
 */

@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KlassSelectModule,
  ],
  exports: [
    AddComponent
  ]
})
export class AddModule {
}
