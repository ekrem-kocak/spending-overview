import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { WaitingComponent } from './waiting/waiting.component';



@NgModule({
  declarations: [
    WaitingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    WaitingComponent
  ]
})
export class SharedModule { }
