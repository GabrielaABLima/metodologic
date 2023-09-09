import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent {
  @Input() title!: string;
  mostrar: boolean = false;

  toggle () {
    this.mostrar = !this.mostrar;
  }
}
