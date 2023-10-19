import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeworksRoutingModule } from './homeworks-routing.module';
import { HomeworksComponent } from './homeworks/homeworks.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importe o MatInputModule do Angular Material
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { EmptyStateModule } from '../components/empty-state/empty-state.module';
import { ModalHomeworksComponent } from './homeworks/components/modal-homeworks/modal-homeworks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/modal/modal.module';
import {MatSelectModule} from '@angular/material/select';
import { ModalDeleteModule } from "../../modal-delete/modal-delete.module";
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { QuestionAddCardModule } from '../question-add-card/question-add-card.module';
import { QuestionListCardModule } from '../question-list-card/question-list-card.module';
import { ModalGradesHomeworkComponent } from './homeworks/components/modal-grades-homework/modal-grades-homework.component';

@NgModule({
    declarations: [
        HomeworksComponent,
        ModalHomeworksComponent,
        ModalGradesHomeworkComponent,
    ],
    imports: [
        CommonModule,
        HomeworksRoutingModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        MatFormFieldModule,
        MatIconModule,
        EmptyStateModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        MatSelectModule,
        ModalDeleteModule,
        MatMenuModule,
        MatButtonModule,
        MatSnackBarModule,
        QuestionAddCardModule,
        QuestionListCardModule,

    ]
})
export class HomeworksModule { }
