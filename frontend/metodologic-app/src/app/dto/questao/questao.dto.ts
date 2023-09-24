import { Conteudo } from "../conteudo/conteudo.dto";

export class Questao {
  constructor(
    public id: number,
    public categoria: string,
    public nivel: number,
    public ponto: number,
    public tipo: string,
    public conteudo?: Conteudo,
  ) {}
}
