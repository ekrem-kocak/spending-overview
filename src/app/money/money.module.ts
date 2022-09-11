import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyRoutingModule } from './money-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MoneyRoutingModule,
    SharedModule
  ]
})
export class MoneyModule { }
