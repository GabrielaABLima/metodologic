import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultipleChoiceOption } from 'src/app/dto/questao/multiple-choice.type';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { BuildQuestionService } from 'src/app/services/build_question.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent {
  @Input() question!: Questao;
  @Output() answerSelected: EventEmitter<number> = new EventEmitter();

  constructor(
    private buildQuestionService: BuildQuestionService
  ) {}
  options: MultipleChoiceOption[] = [];

  ngOnInit(){
    if(this.question){
      this.options = this.buildQuestionService.buildMultipleChoiceQuestion(this.question);

    }

  }

  selectAnswer(option: MultipleChoiceOption) {
    console.log(option);
    if(option.isAnswer){
      this.answerSelected.emit(this.question.pontos);
    }else{
      this.answerSelected.emit(0);
    }

  }

}
