import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lineAnimation } from 'src/app/animation/line_animation';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-questao-container',
  templateUrl: './questao-container.component.html',
  styleUrls: ['./questao-container.component.css'],
  animations: [lineAnimation]
})

export class QuestaoContainerComponent {
  currentQuestion!: string; // Armazena a questão atual
  questions: string[] = []; // Array de perguntas do módulo 1
  currentIndex: number = 0; // Índice da questão atual
  score: number = 0;
  type: string | null;
  id: string | null

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {

  }

  nextQuestion() {
    console.log("teste");
    this.currentIndex++;
    this.currentQuestion = this.questions[this.currentIndex];
  }

  // Função para manipular a resposta selecionada
  handleAnswer(answerInfo: { answer: string, isCorrect: boolean }) {
    // Implemente a lógica para somar a pontuação e tomar ações com base na resposta
    const { isCorrect } = answerInfo;
    if (isCorrect) {
      this.score++; // Adicione pontos à pontuação
    }
    // Você pode decidir aqui quando a próxima questão deve ser carregada ou se o módulo deve ser encerrado.
  }

  closeGame(data: any) {
    if(this.type === "module"){
      this.router.navigate(['/journey']);
    }else{
      this.router.navigate(['/homeworks']);
    }

  }
}
