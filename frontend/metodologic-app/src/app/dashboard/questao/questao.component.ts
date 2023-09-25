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
  associativeMetodoSelected!: number;

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      if(this.question){
        if(this.question.tipo === "OPTATIVA"){
          this.options = this.buildQuestionService.buildMultipleChoiceQuestion(this.question);
        }else if(this.question.tipo === "ASSOCIACAO"){
          this.buildQuestionService.buildAssociativeQuestion(this.question)
          .subscribe((associativeList: AssociativeList) => {
            this.associatives = associativeList;
          });


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

  selectAssociativeMetodo(key: number){
    console.log(key);
    this.associativeMetodoSelected = key;
  }

  selectAssociativeAnswer(key: number){
    console.log(key);
    if(key === this.associativeMetodoSelected){
      this.answerSelected.emit(this.question.pontos);
      this.associatives.metodos = this.associatives.metodos.filter((metodo) => metodo.value != key);
      this.associatives.answers = this.associatives.answers.filter((answer) => answer.value != key);
    }else{
      this.answerSelected.emit(-this.question.pontos);
    }
  }

}
