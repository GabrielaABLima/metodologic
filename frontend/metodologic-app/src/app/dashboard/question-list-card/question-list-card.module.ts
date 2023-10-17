import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionListCardComponent } from './question-list-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EmptyStateModule } from '../components/empty-state/empty-state.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    QuestionListCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    EmptyStateModule,
    MatButtonModule,
  ],
  exports: [
    QuestionListCardComponent,
  ]
})
export class QuestionListCardModule { }
