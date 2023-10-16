import { Conteudo } from "../conteudo/conteudo.dto";

export class Questao {
  constructor(
    public id: number,
    public categoria: string,
    public nivel: number,
    public pontos: number,
    public tipo: string,
    public conteudo?: Conteudo,
  ) {}
}

export class QuestaoTarefa {
  constructor(
    public id: number,
    public questaoId: number,
    public tarefaId: number,
  ) {}
}
