import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent {
  @Input() title!: string;
  mostrar: boolean = false;
  classId?: number;

  toggle (classId?: number) {
    this.classId = classId;
    this.mostrar = !this.mostrar;
  }
}
