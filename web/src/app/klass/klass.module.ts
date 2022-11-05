import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KlassRoutingModule} from './klass-routing.module';
import {IndexModule} from './index/index.module';
import {AddModule} from './add/add.module';
import {EditModule} from './edit/edit.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    KlassRoutingModule,
    IndexModule,
    AddModule,
    EditModule
  ]
})
export class KlassModule { }
