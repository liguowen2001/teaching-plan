import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IndexModule} from './index/index.module';
import {EditModule} from './edit/edit.module';
import {TeachingPlanRoutingModule} from './teaching-plan-routing.module';
import {AddModule} from './add/add.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IndexModule,
    AddModule,
    EditModule,
    TeachingPlanRoutingModule
  ]
})
export class TeachingPlanModule { }
