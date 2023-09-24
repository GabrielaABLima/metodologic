import { Injectable } from '@angular/core';
import { Questao } from '../dto/questao/questao.dto';
import { MultipleChoiceOption } from '../dto/questao/multiple-choice.type';
import { ContentService } from './content.service';
import { Conteudo } from '../dto/conteudo/conteudo.dto';
import { Associative, AssociativeList } from '../dto/questao/associative.type';

@Injectable({
  providedIn: 'root'
})



export class BuildQuestionService {

  constructor(private contentService: ContentService) { }

  buildMultipleChoiceQuestion(questao: Questao): MultipleChoiceOption[]{
    const options: MultipleChoiceOption[] = []
    if(questao.conteudo){
      this.contentService.getRandomContentExceptById(questao.conteudo.id).subscribe({
        next: (conteudos) => {
          conteudos.map((conteudo) => {
            const buildConteudo = this.obterValorDaPropriedade(conteudo, questao.categoria.toLowerCase()) + "";
            const conteudoToAdd: MultipleChoiceOption = new MultipleChoiceOption(buildConteudo, false);
            options.push(conteudoToAdd);
          })
        },
        error: (err) => {
          console.log(err);
        }
      })
      const indiceAleatorio = Math.floor(Math.random() * (options.length + 1));

      const rightAnswerConteudo =  this.obterValorDaPropriedade(questao.conteudo, questao.categoria.toLowerCase()) + "";
      const conteudoRightToAdd: MultipleChoiceOption = new MultipleChoiceOption(rightAnswerConteudo, true);
      options.splice(indiceAleatorio, 0, conteudoRightToAdd);

    }

    return options;
  }

  buildAssociativeQuestion(questao: Questao): AssociativeList{
    let associativeMetodos: Associative[] = []
    let associativeAnswers: Associative[] = []
    this.contentService.getRandomContent().subscribe({
      next: (conteudos) => {
        conteudos.slice(0, 4).map((conteudo) => {
          const buildConteudo = this.obterValorDaPropriedade(conteudo, questao.categoria.toLowerCase()) + "";
          const conteudoToAdd: Associative = new Associative(conteudo.metodo, conteudo.id);
          const answerToAdd: Associative = new Associative(buildConteudo, conteudo.id);
          associativeMetodos.push(conteudoToAdd);
          associativeAnswers.push(answerToAdd);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })

    associativeMetodos = this.shuffleArray(associativeMetodos);
    associativeAnswers = this.shuffleArray(associativeAnswers);


    return new AssociativeList(associativeMetodos, associativeAnswers);
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }

  obterValorDaPropriedade(conteudo: Conteudo, propriedade: string) {
    if (conteudo.hasOwnProperty(propriedade)) {
      return conteudo[propriedade] + "";
    } else {
      return null;
    }
  }

}

