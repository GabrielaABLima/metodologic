import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-student-list-card',
  templateUrl: './student-list-card.component.html',
  styleUrls: ['./student-list-card.component.css']
})
export class StudentListCardComponent {
  @Input() name!: string;
  @Input() email!: string;
  @Input() points!: number;
  @Input() addStudent!: boolean;
  @Input() removeStudent!:boolean;
  @Input() studentId!: number;
  @Output() actionClicked: EventEmitter<number> = new EventEmitter<number>();

  performAction() {
    this.actionClicked.emit(this.studentId);
  }
}
