import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestaoComponent } from './questao.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    QuestaoComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule

  ],
  exports: [
    QuestaoComponent
  ]
})
export class QuestaoModule { }
