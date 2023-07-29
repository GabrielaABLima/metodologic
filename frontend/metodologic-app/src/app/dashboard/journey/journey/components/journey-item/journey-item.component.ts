import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-journey-item',
  templateUrl: './journey-item.component.html',
  styleUrls: ['./journey-item.component.css']
})
export class JourneyItemComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() color: string = "";
}
