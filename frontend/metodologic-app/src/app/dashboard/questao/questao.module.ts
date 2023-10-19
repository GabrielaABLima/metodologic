import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestaoComponent } from './questao.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    QuestaoComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    MatInputModule

  ],
  exports: [
    QuestaoComponent
  ]
})
export class QuestaoModule { }
