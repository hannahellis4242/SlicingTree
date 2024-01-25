import Branch from "./Branch";
import Direction from "./Direction";
import Leaf from "./Leaf";
import NullNode from "./NullNode";
import OptionNode from "./OptionNode";
import getSplits from "./getSplits";

const createTree = <T>(
  values: T[],
  id?: number,
  direction?: Direction
): OptionNode => {
  if (values.length === 0) {
    return new NullNode();
  }
  if (values.length === 1) {
    return new Leaf(values[0], id, direction);
  }
  const children = getSplits(values).flatMap(
    ([leftOptions, rightOptions], id) => {
      const leftChild = createTree(leftOptions, id, "left");
      const rightChild = createTree(rightOptions, id, "right");
      return [leftChild, rightChild];
    }
  );
  return new Branch(children, id, direction);
};

export default createTree;
