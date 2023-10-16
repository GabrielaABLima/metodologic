import { Turma } from "../turma/turma.dto";

export class TarefaCreate {
  constructor(
    public nome: string,
    public dataEntrega: Date,
    public dataAtribuicao: Date,
    public codigo: string,
  ) {}
}

export class Tarefa {
  constructor(
    public id: number,
    public nome: string,
    public dataEntrega: Date,
    public dataAtribuicao: Date,
    public turma: Turma,
    public nota?: number,
  ) {}
}

