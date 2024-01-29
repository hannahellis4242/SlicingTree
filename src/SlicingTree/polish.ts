import HorizontalSlice from "./HorizontalSlice";
import Leaf from "./Leaf";
import SlicingTreeNode from "./SlicingTreeNode";
import VerticalSlice from "./VerticalSlice";

const polish = <T>(
    node: SlicingTreeNode,
    fn: <T>(leaf: Leaf<T>) => string
  ): string => {
    if (node instanceof Leaf) {
      return fn(node);
    }
    if (node instanceof HorizontalSlice) {
      const left = polish(node.left, fn);
      const right = polish(node.right, fn);
      return `${left}${right}H`;
    }
    if (node instanceof VerticalSlice) {
      const lower = polish(node.lower, fn);
      const upper = polish(node.upper, fn);
      return `${lower}${upper}V`;
    }
    return "";
  };
  export default polish;