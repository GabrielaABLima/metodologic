import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from './modal/modal.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmptyStateComponent } from './dashboard/components/empty-state/empty-state.component';
import { NotLoggedComponent } from './dashboard/components/not-logged/not-logged.component';
import { EmptyStateModule } from './dashboard/components/empty-state/empty-state.module';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { QuestionAddCardComponent } from './dashboard/question-add-card/question-add-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NotLoggedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ModalModule,
    MatFormFieldModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
