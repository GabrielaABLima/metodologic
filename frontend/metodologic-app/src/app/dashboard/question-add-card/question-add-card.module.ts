import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionAddCardComponent } from './question-add-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    QuestionAddCardComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [
    QuestionAddCardComponent,


  ]
})
export class QuestionAddCardModule {

}
