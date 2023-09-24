export class Conteudo {
  constructor(
    public definicao: string,
    public exemplos: string,
    public instrumentos: string,
    public metodo: string,
    public palavrasChaves: string,
    public tecnicas: string,
    public id: number
  ) {}

  [key: string]: string | number;
}
