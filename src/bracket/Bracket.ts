import BracketNode from "./BracketNode";

export default class Bracket<T> implements BracketNode<T> {
  constructor(public left: BracketNode<T>, public right: BracketNode<T>) {}
  clone(): BracketNode<T> {
    const left = this.left.clone();
    const right = this.right.clone();
    return new Bracket(left,right);
  }
  postOrder(): BracketNode<T>[] {
    return [...this.left.postOrder(), ...this.right.postOrder(), this];
  }
}
