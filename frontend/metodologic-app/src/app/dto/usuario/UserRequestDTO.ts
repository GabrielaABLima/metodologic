export class UsuarioRequestDTO {
  constructor(
    public nome: string,
    public email: string,
    public senha: string,
    public dataNascimento: Date,
    public curso: string,
    public instituicaoEnsino: string,
    public role: string,
  ) {}
}
