import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './waiting/waiting.component';



@NgModule({
  declarations: [
    WaitingComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    WaitingComponent
  ]
})
export class SharedModule { }
