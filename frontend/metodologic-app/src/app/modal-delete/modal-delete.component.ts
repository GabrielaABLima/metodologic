import { identifierName } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Output() delete = new EventEmitter<number|string>();
  mostrar: boolean = false;
  id?: string | number;



  emitirEvento() {
    this.delete.emit(this.id);
  }

  toggle(id?: string | number) {
    this.id = id;
    this.mostrar = !this.mostrar;
  }

}
