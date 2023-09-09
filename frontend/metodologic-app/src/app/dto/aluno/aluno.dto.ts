export class Aluno {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public dataNascimento: Date,
    public curso: string,
    public instituicaoEnsino: string,
    public pontos?: number,
    public nivel?: number,
    // public imagem?: string,
    public id?: number
  ) {}
}
