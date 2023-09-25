import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lineAnimation } from 'src/app/animation/line_animation';
import { AnimationEvent } from '@angular/animations';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-questao-container',
  templateUrl: './questao-container.component.html',
  styleUrls: ['./questao-container.component.css'],
  animations: [lineAnimation]
})

export class QuestaoContainerComponent {
  currentQuestion!: Questao;
  questoes: Questao[] = [];
  currentIndex: number = 0;
  score: number = 0;
  type: string | null;
  id: string | null
  pontoQuestaoAtual: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private elementRef: ElementRef
  ) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.setWidth('0%')
    if(this.id){
      this.questionService.getByModule(+this.id).subscribe({
          next: (response) => {
            response.map((questao) => {
              this.questoes.push(questao);
            })
          },
          error: (err) => {
            console.log(err);
          }
      })
    }
  }

  setWidth(width: string) {
    const elemento = this.elementRef.nativeElement.querySelector('.progress-bar-done');

    if (elemento) {
      elemento.style.width = width;
    }
  }



  nextQuestion() {
    this.score += this.pontoQuestaoAtual;


    this.currentIndex++;
    this.currentQuestion = this.questoes[this.currentIndex];
    this.setWidth(((this.currentIndex / this.questoes.length) * 100) + "%");

  }

  handleAnswer(pontos: number) {
    if(this.questoes[this.currentIndex].tipo === "ASSOCIACAO"){
      this.score += pontos;
    }else{
      this.pontoQuestaoAtual = pontos;
    }

  }

  skipQuestion() {
    this.score -= 5;


    this.currentIndex++;
    this.currentQuestion = this.questoes[this.currentIndex];
    this.setWidth(((this.currentIndex / this.questoes.length) * 100) + "%");
  }

  closeGame(data: any) {
    if(this.type === "module"){
      this.router.navigate(['/journey']);
    }else{
      this.router.navigate(['/homeworks']);
    }

  }
}
