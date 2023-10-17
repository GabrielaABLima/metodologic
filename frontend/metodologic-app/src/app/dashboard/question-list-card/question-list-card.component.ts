import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { QuestionsHomeworksService } from 'src/app/services/questions_homeworks.service';

@Component({
  selector: 'app-question-list-card',
  templateUrl: './question-list-card.component.html',
  styleUrls: ['./question-list-card.component.css']
})
export class QuestionListCardComponent {
  @Input() questions: Questao[] = [];
  @Output() removeQuestion: EventEmitter<number> = new EventEmitter<number>();
  titleEmpty =  "Nenhuma questão atribuída";
  descriptionEmpty = "Não há questões atribuídas a esta tarefa no momento. Adicione uma nova questão para configurar a tarefa.";

  constructor(
    private router: Router,
    private questionsHomeworksService: QuestionsHomeworksService,
  ) { }

  viewQuestion(id: number){
    this.router.navigate(['/question/view/' + id]);
  }

  deleteQuestion(id: number){
    this.removeQuestion.emit(id);
  }

}
