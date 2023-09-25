export class Usuario {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public dataNascimento: Date,
    public curso: string,
    public instituicaoEnsino: string,
    public pontos: number,
    public id: number
  ) {}
}
