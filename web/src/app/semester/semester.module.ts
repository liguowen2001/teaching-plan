import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from './index/index.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';
import {SemesterRoutingModule} from './semester-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    AddModule,
    EditModule,
    SemesterRoutingModule
  ]
})
export class SemesterModule { }
