import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Importe o MatInputModule do Angular Material
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProgressInfoComponent } from './profile/components/progress-info/progress-info.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PdfPagesComponent } from './profile/components/pdf-pages/pdf-pages.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProgressInfoComponent,
    PdfPagesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ]
})
export class ProfileModule { }
