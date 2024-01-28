import partitions from "../partitioning/partitions";
import HorizontalSlice from "./HorizontalSlice";
import Leaf from "./Leaf";
import SlicingTreeNode from "./SlicingTreeNode";
import VerticalSlice from "./VerticalSlice";

const createTrees = <T>(items: T[]): SlicingTreeNode[] => {
    if (items.length === 0) {
      return [];
    }
    if (items.length === 1) {
      return [new Leaf(items[0])];
    }
    return partitions(items)
      .filter(([x, _]) => x.length !== 0)
      .filter(([_, x]) => x.length !== 0)
      .flatMap(([xs, ys]) =>
        createTrees(xs)
          .map((x) => createTrees(ys).flatMap((y) => [x, y]))
          .flatMap(([x, y]) => [
            new HorizontalSlice(x, y),
            new VerticalSlice(x, y),
          ])
      );
  };

  export default createTrees;