import { Aluno } from "../aluno/aluno.dto";
import { Professor } from "../professor/professor.dto";

export class Turma {
  constructor(
    public nome: string,
    public codigo: string,
    public curso: string,
    public instituicaoEnsino: string,
    public descricao?: string,
    public professorId?: number,
    public id?: number
  ) {}
}
