import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MajorRoutingModule} from './major-routing.module';
import {IndexModule} from './index/index.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MajorRoutingModule,
    IndexModule,
    AddModule,
    EditModule
  ]
})
export class MajorModule { }
