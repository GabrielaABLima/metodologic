import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lineAnimation } from 'src/app/animation/line_animation';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { QuestionService } from 'src/app/services/question.service';
import { UsersService } from 'src/app/services/users.service';

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
    private elementRef: ElementRef,
    private userService: UsersService
  ) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.setWidth('0%')
    if(this.id){
      this.questionService.getByModule(+this.id).subscribe({
          next: (response) => {
            response.slice(0,5).map((questao) => {
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
    if(this.currentIndex === (this.questoes.length -1)){
      const id = sessionStorage.getItem("id");
      const pontos = sessionStorage.getItem("points");
      console.log(pontos);
      if (id !== null && pontos !== null){
        this.userService.updateUserPoints(+id, +pontos+this.score).subscribe({
          next: (response) => {
            console.log(response);
            sessionStorage.setItem("points", (+pontos+this.score)+"");
          },
          error: (err) => {
            console.log(err);
          }
        })
      }


      this.closeGame();
    }else{
      this.score += this.pontoQuestaoAtual;


      this.currentIndex++;
      this.currentQuestion = this.questoes[this.currentIndex];
      this.setWidth(((this.currentIndex / (this.questoes.length-1)) * 100) + "%");
    }




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
    this.setWidth(((this.currentIndex / (this.questoes.length-1)) * 100) + "%");
  }

  closeGame() {
    if(this.type === "module"){
      this.router.navigate(['/journey']);
    }else{
      this.router.navigate(['/homeworks']);
    }

  }
}
