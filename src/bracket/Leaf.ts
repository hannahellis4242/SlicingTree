import BracketNode from "./BracketNode";

export default class Leaf<T> implements BracketNode<T> {
  constructor(public readonly value: T) {}
  clone(): BracketNode<T> {
    return new Leaf(this.value);
  }
  postOrder(): BracketNode<T>[] {
    return [this];
  }
}
