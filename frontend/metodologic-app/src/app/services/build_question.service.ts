import { Injectable } from '@angular/core';
import { Questao } from '../dto/questao/questao.dto';
import { MultipleChoiceOption } from '../dto/questao/multiple-choice.type';
import { ContentService } from './content.service';
import { Conteudo } from '../dto/conteudo/conteudo.dto';
import { Associative, AssociativeList } from '../dto/questao/associative.type';
import { Observable, catchError, map } from 'rxjs';
import { GapQuestion } from '../dto/questao/gap-question.type';

@Injectable({
  providedIn: 'root'
})



export class BuildQuestionService {

  constructor(private contentService: ContentService) { }

  buildMultipleChoiceQuestion(questao: Questao): MultipleChoiceOption[]{
    const options: MultipleChoiceOption[] = []
    const conteudoSelecionado = questao.conteudo;
    if(conteudoSelecionado){
      this.contentService.getRandomContentExceptById(conteudoSelecionado.id).subscribe({
        next: (conteudos) => {
          conteudos.map((conteudo) => {
            const buildConteudo = this.obterValorDaPropriedade(conteudo, questao.categoria.toLowerCase()) + "";
            const conteudoToAdd: MultipleChoiceOption = new MultipleChoiceOption(buildConteudo, false);
            options.push(conteudoToAdd);
          })
          const indiceAleatorio = Math.floor(Math.random() * (options.length));

          const rightAnswerConteudo =  this.obterValorDaPropriedade(conteudoSelecionado, questao.categoria.toLowerCase()) + "";
          const conteudoRightToAdd: MultipleChoiceOption = new MultipleChoiceOption(rightAnswerConteudo, true);
          options.splice(indiceAleatorio, 0, conteudoRightToAdd);

        },
        error: (err) => {
          console.log(err);
        }
      })

    }

    return options;
  }

  buildGapQuestion(questao: Questao): GapQuestion {
    const conteudoSelecionado = questao.conteudo;

    if(conteudoSelecionado){
      const gapSentence = conteudoSelecionado.lacuna.split('*');
      const gapQuestion = new GapQuestion(gapSentence[0], gapSentence[2], gapSentence[1]);

      return gapQuestion;

    }
    return new GapQuestion("", "", "");

  }


  buildAssociativeQuestion(questao: Questao): Observable<AssociativeList> {
    return this.contentService.getRandomContent().pipe(
      map((conteudos) => {
        const slicedConteudos = conteudos.slice(0, 4);
        const associativeMetodos: Associative[] = [];
        const associativeAnswers: Associative[] = [];

        slicedConteudos.forEach((conteudo) => {
          const buildConteudo = this.obterValorDaPropriedade(conteudo, questao.categoria.toLowerCase()) + "";
          const conteudoToAdd: Associative = new Associative(conteudo.metodo, conteudo.id);
          const answerToAdd: Associative = new Associative(buildConteudo, conteudo.id);
          associativeMetodos.push(conteudoToAdd);
          associativeAnswers.push(answerToAdd);
        });

        const shuffledMetodos = this.shuffleArray(associativeMetodos);

        return new AssociativeList(shuffledMetodos, associativeAnswers);
      }),
      catchError((error) => {
        console.log(error);
        throw error;
      })
    );
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    console.log(array);

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

