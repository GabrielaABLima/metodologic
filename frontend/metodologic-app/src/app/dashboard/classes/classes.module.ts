import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes/classes.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importe o MatInputModule do Angular Material
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ModalModule } from 'src/app/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListCardComponent } from './classes/components/student-list-card/student-list-card.component';
import { ModalClassesComponent } from './classes/components/modal-classes/modal-classes.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ClassesComponent,
    StudentListCardComponent,
    ModalClassesComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
  ]
})
export class ClassesModule { }
