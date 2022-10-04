import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { WaitingComponent } from './waiting/waiting.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';



@NgModule({
  declarations: [
    WaitingComponent,
    LanguageSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports:[
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    /* componenets */
    WaitingComponent,
    LanguageSelectorComponent
    /* end componenets */

  ]
})
export class SharedModule { }
