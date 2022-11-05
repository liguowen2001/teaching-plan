import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {YzPageModule, YzSizeModule} from '@yunzhi/ng-common';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    YzSizeModule,
    YzPageModule
  ]
})
export class IndexModule { }
