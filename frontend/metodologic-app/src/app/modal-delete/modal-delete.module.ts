import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDeleteComponent } from './modal-delete.component';
import { ModalModule } from '../modal/modal.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ModalDeleteComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    MatIconModule,
  ],
  exports: [
    ModalDeleteComponent,
  ]
})
export class ModalDeleteModule {

}
