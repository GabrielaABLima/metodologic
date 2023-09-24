import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestaoContainerComponent } from './questao-container.component';


const routes: Routes = [
  {path: "", component: QuestaoContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestaoContainerRoutingModule { }
