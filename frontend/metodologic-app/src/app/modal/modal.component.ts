import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent {
  @Input() title!: string;
  mostrar: boolean = false;
  id?: string;


  toggle(classId?: string) {
    this.id = classId;
    this.mostrar = !this.mostrar;
  }


}
