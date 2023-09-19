import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-journey-item',
  templateUrl: './journey-item.component.html',
  styleUrls: ['./journey-item.component.css']
})
export class JourneyItemComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() color: string = "";
  @Input() clickable: boolean = false;

  @Output() onClickModule: EventEmitter<void> = new EventEmitter<void>();

  openModal() {
    this.onClickModule.emit();
  }

}
