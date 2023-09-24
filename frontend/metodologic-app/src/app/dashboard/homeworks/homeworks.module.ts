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

@NgModule({
  declarations: [
    HomeworksComponent,
  ],
  imports: [
    CommonModule,
    HomeworksRoutingModule,
    MatTableModule,
    MatInputModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    EmptyStateModule
  ]
})
export class HomeworksModule { }
