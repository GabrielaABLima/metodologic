import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Associative, AssociativeList } from 'src/app/dto/questao/associative.type';
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
  associatives !: AssociativeList;
  associativeMetodos : Associative[] = [];
  associativeAnswers : Associative[] = [];

  ngOnInit(){
    console.log(this.question);
    if(this.question){
      if(this.question.tipo === "OPTATIVA"){
        this.options = this.buildQuestionService.buildMultipleChoiceQuestion(this.question);
      }else if(this.question.tipo === "ASSOCIACAO"){
        this.associatives = this.buildQuestionService.buildAssociativeQuestion(this.question);

      }
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      if(this.question){
        if(this.question.tipo === "OPTATIVA"){
          this.options = this.buildQuestionService.buildMultipleChoiceQuestion(this.question);
        }else if(this.question.tipo === "ASSOCIACAO"){
          this.associatives = this.buildQuestionService.buildAssociativeQuestion(this.question);

        }
      }
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
