import BracketNode from "./BracketNode";

export default class Bracket<T> implements BracketNode<T> {
    constructor(
      public readonly left: BracketNode<T>,
      public readonly right: BracketNode<T>
    ) {}
    postOrder(): BracketNode<T>[] {
      return [...this.left.postOrder(), ...this.right.postOrder(), this];
    }
  }