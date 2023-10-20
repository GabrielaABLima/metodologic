import { Aluno } from "../aluno/aluno.dto";
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

export class AlunoTarefa {
  constructor(
    public id: number,
    public alunoId: number,
    public tarefaId: number,
    public nota: number,
  ) {}
}

export class AlunoTarefaResponse {
  constructor(
    public id: number,
    public aluno: Aluno,
    public tarefa: Tarefa,
    public nota: number,
  ) {}
}

export class TarefaByAluno {
  constructor(
    public tarefa: Tarefa,
    public nota: string,
    public done: boolean,
  ) {}
}
