import { QuestionsHomeworksService } from 'src/app/services/questions_homeworks.service';
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lineAnimation } from 'src/app/animation/line_animation';
import { Questao } from 'src/app/dto/questao/questao.dto';
import { QuestionService } from 'src/app/services/question.service';
import { UsersService } from 'src/app/services/users.service';
import { StudentsHomeworksService } from 'src/app/services/students_homeworks.service';

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
  userId = sessionStorage.getItem("id");

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private questionsHomeworksService: QuestionsHomeworksService,
    private studentsHomeworksService: StudentsHomeworksService,
    private elementRef: ElementRef,
    private userService: UsersService
  ) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.setWidth('0%')
    if(this.type === "module"){
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
    }else if(this.type === "view"){
      if(this.id){
        this.questionService.getById(+this.id).subscribe({
            next: (response) => {
              this.questoes.push(response);
            },
            error: (err) => {
              console.log(err);
            }
        })

      }
    }else if(this.type === "homework"){
      if(this.id){
        this.questionsHomeworksService.getQuestionsByHomework(+this.id).subscribe({
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
  }

  setWidth(width: string) {
    const elemento = this.elementRef.nativeElement.querySelector('.progress-bar-done');

    if (elemento) {
      elemento.style.width = width;
    }
  }



  nextQuestion() {
    if(this.userId && this.id){
    this.score += this.pontoQuestaoAtual;
    if(this.currentIndex === (this.questoes.length -1)){
      const id = sessionStorage.getItem("id");
      const pontos = sessionStorage.getItem("points");
      if (id !== null && pontos !== null){
        this.userService.updateUserPoints(+id, +pontos+this.score).subscribe({
          next: (response) => {
            sessionStorage.setItem("points", (+pontos+this.score)+"");
          },
          error: (err) => {
            console.log(err);
          }
        })
        if(this.type === "homework"){
          const maxGrade = this.questoes.reduce((acumulador, questao) => {
            return acumulador + questao.pontos;
          }, 0);
          const grade = Math.round((this.score * 100)/maxGrade);
          this.studentsHomeworksService.add({tarefaId: +this.id, alunoId: +this.userId, nota: grade}).subscribe({
            next: (response) => {
              console.log(response);
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }


      this.closeGame();
    }else{



      this.currentIndex++;
      this.currentQuestion = this.questoes[this.currentIndex];
      this.setWidth(((this.currentIndex / (this.questoes.length-1)) * 100) + "%");
    }


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
