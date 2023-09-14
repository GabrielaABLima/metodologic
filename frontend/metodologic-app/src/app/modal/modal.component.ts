import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent {
  @Input() title!: string;
  mostrar: boolean = false;
  classId?: string;

  toggle (classId?: string) {
    this.classId = classId;
    this.mostrar = !this.mostrar;
  }
}
