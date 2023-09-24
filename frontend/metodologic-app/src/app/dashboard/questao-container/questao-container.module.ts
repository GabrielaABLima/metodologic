import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestaoContainerComponent } from './questao-container.component';
import { QuestaoContainerRoutingModule } from './questao-container-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    QuestaoContainerComponent
  ],
  imports: [
    CommonModule,
    QuestaoContainerRoutingModule
  ]
})
export class QuestaoContainerModule { }
