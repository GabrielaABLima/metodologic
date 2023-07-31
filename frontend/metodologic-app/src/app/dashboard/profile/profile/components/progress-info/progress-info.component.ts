import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-info',
  templateUrl: './progress-info.component.html',
  styleUrls: ['./progress-info.component.css']
})
export class ProgressInfoComponent {
  @Input() title: string = '';
  @Input() percentage: string = "0";
  @Input() description: string = '';
}
