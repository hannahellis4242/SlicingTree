import BracketNode from "./BracketNode";

export default class Leaf<T> implements BracketNode<T> {
  constructor(public readonly value: T) {}
  postOrder(): BracketNode<T>[] {
    return [this];
  }
}
