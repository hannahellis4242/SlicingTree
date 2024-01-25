import Bracket from "./Bracket";
import BracketNode from "./BracketNode";
import Leaf from "./Leaf";

const start = <T>([head, ...tail]: T[]): BracketNode<T> | undefined => {
  if (!head) {
    return undefined;
  }
  const left = new Leaf(head);
  const right = start(tail);
  if (!right) {
    return left;
  }
  return new Bracket(left, right);
};
export default start;
