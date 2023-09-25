export class UpdateUserRequestDTO {
  constructor(
    public nome: string,
    public email: string,
    public dataNascimento: Date,
    public curso: string,
    public instituicaoEnsino: string,
  ) {}
}
