import { GapQuestion } from './../../dto/questao/gap-question.type';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Associative, AssociativeList } from 'src/app/dto/questao/associative.type';
import { MultipleChoiceOption } from 'src/app/dto/questao/multiple-choice.type';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { BuildQuestionService } from 'src/app/services/build_question.service';
import { Categoria } from 'src/app/dto/conteudo/conteudo.dto';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})
export class QuestaoComponent {
  @Input() question!: Questao;
  @Output() answerSelected: EventEmitter<number> = new EventEmitter();
  title = "";
  plural = false;
  gapInput = "";

  constructor(
    private buildQuestionService: BuildQuestionService
  ) {}
  options: MultipleChoiceOption[] = [];
  associatives !: AssociativeList;
  gapQuestion !: GapQuestion;
  associativeMetodoSelected!: number;

  ngOnInit(){
    this.gapInput = "";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.gapInput = "";
      if(this.question){
        this.title = Categoria[this.question.categoria as keyof typeof Categoria];
        if(this.question.categoria === 'INSTRUMENTO' || this.question.categoria === 'PALAVRA_CHAVE' || this.question.categoria === 'TECNICA'){
          this.plural=true;
        }
        if(this.question.tipo === "OPTATIVA"){
          this.options = this.buildQuestionService.buildMultipleChoiceQuestion(this.question);
        }else if(this.question.tipo === "ASSOCIACAO"){
          this.buildQuestionService.buildAssociativeQuestion(this.question)
          .subscribe((associativeList: AssociativeList) => {
            this.associatives = associativeList;
          });
        }else if(this.question.tipo === "LACUNAS"){
          this.gapQuestion = this.buildQuestionService.buildGapQuestion(this.question);
          console.log(this.gapQuestion);
        }
      }
    }
  }

  selectAnswer(option: MultipleChoiceOption) {
    if(option.isAnswer){
      this.answerSelected.emit(this.question.pontos);
    }else{
      this.answerSelected.emit(0);
    }

  }

  selectAssociativeMetodo(key: number){
    this.associativeMetodoSelected = key;
  }

  selectAssociativeAnswer(key: number){
    if(key === this.associativeMetodoSelected){
      this.answerSelected.emit(this.question.pontos);
      this.associatives.metodos = this.associatives.metodos.filter((metodo) => metodo.value != key);
      this.associatives.answers = this.associatives.answers.filter((answer) => answer.value != key);
    }else{
      this.answerSelected.emit(-this.question.pontos);
    }
  }

  onGapInputChange(event: any){
    if(event.target.value === this.gapQuestion.rightAnswer){
      this.answerSelected.emit(this.question.pontos);
    }else{
      this.answerSelected.emit(0);
    }
  }

}
