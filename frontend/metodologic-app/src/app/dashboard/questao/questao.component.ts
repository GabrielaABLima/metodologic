import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent {
  @Input() question!: string;
  @Output() answerSelected: EventEmitter<{ answer: string, isCorrect: boolean }> = new EventEmitter();

  selectAnswer(answer: string) {
    // Implemente a lógica para verificar se a resposta está correta
    const isCorrect = /* Implemente a lógica para verificar a resposta */ true;
    this.answerSelected.emit({ answer, isCorrect });
  }
}
