import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestaoContainerComponent } from './questao-container.component';
import { QuestaoContainerRoutingModule } from './questao-container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    QuestaoContainerComponent
  ],
  imports: [
    CommonModule,
    QuestaoContainerRoutingModule,
    MatIconModule
  ]
})
export class QuestaoContainerModule { }
