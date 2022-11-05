import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MajorSelectModule} from '../../major/major-select/major-select.module';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    YzSizeModule,
    YzPageModule,
    ReactiveFormsModule,
    RouterModule,
    MajorSelectModule
  ]
})
export class IndexModule { }
