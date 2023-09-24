export class Associative {
    constructor(
      public metodoKey: string,
      public value: number,
    ) {}
  }

  export class AssociativeList {
    constructor(
      public metodos: Associative[],
      public answers: Associative[],
    ) {}
  }
