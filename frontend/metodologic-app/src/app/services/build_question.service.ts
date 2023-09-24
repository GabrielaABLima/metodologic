import { Injectable } from '@angular/core';
import { Questao } from '../dto/questao/questao.dto';
import { MultipleChoiceOption } from '../dto/questao/multiple-choice.type';
import { ContentService } from './content.service';
import { Conteudo } from '../dto/conteudo/conteudo.dto';

@Injectable({
  providedIn: 'root'
})



export class BuildQuestionService {

  constructor(private contentService: ContentService) { }

  buildMultipleChoiceQuestion(questao: Questao): MultipleChoiceOption[]{
    const options: MultipleChoiceOption[] = []
    this.contentService.getRandomContentExceptById(questao.id).subscribe({
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
    if(questao.conteudo){
      const rightAnswerConteudo =  this.obterValorDaPropriedade(questao.conteudo, questao.categoria.toLowerCase()) + "";
      const conteudoRightToAdd: MultipleChoiceOption = new MultipleChoiceOption(rightAnswerConteudo, true);
      options.splice(indiceAleatorio, 0, conteudoRightToAdd);
    }

    return options;
  }

  obterValorDaPropriedade(conteudo: Conteudo, propriedade: string) {
    if (conteudo.hasOwnProperty(propriedade)) {
      return conteudo[propriedade] + "";
    } else {
      return null;
    }
  }

}

