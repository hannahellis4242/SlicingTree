import HorizontalSlice from "./HorizontalSlice";
import Leaf from "./Leaf";
import SlicingTreeNode from "./SlicingTreeNode";
import VerticalSlice from "./VerticalSlice";
import postOrder from "./postOrder";

const polish = <T>(
  node: SlicingTreeNode,
  fn: <T>(leaf: Leaf<T>) => string
): string =>
  postOrder(node)
    .map((x) => {
      if (x instanceof Leaf) {
        return fn(x);
      }
      if (x instanceof HorizontalSlice) {
        return "H";
      }
      if (x instanceof VerticalSlice) {
        return "V";
      }
      return "";
    })
    .join("");
export default polish;
