import Leaf from "../src/SlicingTree/Leaf";
import HorizontalSlice from "../src/SlicingTree/HorizontalSlice";
import VerticalSlice from "../src/SlicingTree/VerticalSlice";
import SlicingTreeNode from "../src/SlicingTree/SlicingTreeNode";
import {
  SlicingTreeWriter,
  toGraph,
} from "../src/SlicingTree/SlicingTreeGraph";
import { toDot } from "graphts";

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

describe("polish", () => {
  //helper
  const showGraph = (tree: SlicingTreeNode) => {
    const graph = toGraph(tree);
    const dot = toDot(graph, new SlicingTreeWriter(graph));
    console.log(dot);
  };

  let showLeaf = jest.fn();
  beforeEach(() => {
    showLeaf = jest.fn();
    showLeaf.mockImplementation((leaf) => `${leaf.value}`);
  });
  test("leaf node just prints the node value", () => {
    const tree = new Leaf(1);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(1);
    expect(result).toBe("1");
  });
  test("single horizontal slice", () => {
    const left = new Leaf(1);
    const right = new Leaf(2);
    const tree = new HorizontalSlice(left, right);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(2);
    expect(result).toBe("12H");
  });
  test("single vertical slice", () => {
    const lower = new Leaf(1);
    const upper = new Leaf(2);
    const tree = new VerticalSlice(lower, upper);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(2);
    expect(result).toBe("12V");
  });
  test("row1", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const tree = new HorizontalSlice(split1, leaf3);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(3);
    expect(result).toBe("12H3H");
  });
  test("row2", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new HorizontalSlice(leaf2, leaf3);
    const tree = new HorizontalSlice(leaf1, split1);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(3);
    expect(result).toBe("1233HH");
  });
  test("4 element row", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const leaf4 = new Leaf(4);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const split2 = new HorizontalSlice(leaf3,leaf4)
    const tree = new HorizontalSlice(split1, split2);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(4);
    expect(result).toBe("12H34HH");
  });
  test("4 element square", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const leaf4 = new Leaf(4);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const split2 = new HorizontalSlice(leaf3,leaf4)
    const tree = new VerticalSlice(split1, split2);
    const result = polish<number>(tree, showLeaf);
    expect(showLeaf).toHaveBeenCalledTimes(4);
    expect(result).toBe("12H34HV");
  });
});
