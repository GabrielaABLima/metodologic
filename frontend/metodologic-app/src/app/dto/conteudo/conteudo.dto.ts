export class Conteudo {
  constructor(
    public definicao: string,
    public aplicacao: string,
    public instrumentos: string,
    public metodo: string,
    public palavrasChaves: string,
    public tecnicas: string,
    public lacuna: string,
    public id: number
  ) {}

  [key: string]: string | number;
}

export class ConteudoReference {
  constructor(
    public metodo: string,
    public id: number
  ) {}
}

export enum Categoria {
  INSTRUMENTO = 'os instrumentos',
  TECNICA = "as técnicas",
  APLICACAO = 'a aplicação',
  DEFINICAO = 'a definição',
  PALAVRA_CHAVES = 'as palavras-chaves'
}
