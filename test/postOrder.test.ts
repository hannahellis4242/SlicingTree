import HorizontalSlice from "../src/SlicingTree/HorizontalSlice";
import Leaf from "../src/SlicingTree/Leaf";
import VerticalSlice from "../src/SlicingTree/VerticalSlice";
import postOrder from "../src/SlicingTree/postOrder";
describe("postOrder", () => {
  test("leaf node is just the leaf", () => {
    const tree = new Leaf(1);
    const result = postOrder(tree);
    expect(result).toStrictEqual([tree]);
  });
  test("single horizontal slice", () => {
    const left = new Leaf(1);
    const right = new Leaf(2);
    const tree = new HorizontalSlice(left, right);
    const result = postOrder(tree);
    expect(result).toStrictEqual([left, right, tree]);
  });
  test("single vertical slice", () => {
    const lower = new Leaf(1);
    const upper = new Leaf(2);
    const tree = new VerticalSlice(lower, upper);
    const result = postOrder(tree);
    expect(result).toStrictEqual([lower, upper, tree]);
  });

  test("row1", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const tree = new HorizontalSlice(split1, leaf3);
    const result = postOrder(tree);
    expect(result).toStrictEqual([leaf1, leaf2, split1, leaf3, tree]);
  });
  test("row2", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new HorizontalSlice(leaf2, leaf3);
    const tree = new HorizontalSlice(leaf1, split1);
    const result = postOrder(tree);
    expect(result).toStrictEqual([leaf1,leaf2,leaf3,split1,tree]);
  });
  test("4 element row", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const leaf4 = new Leaf(4);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const split2 = new HorizontalSlice(leaf3,leaf4)
    const tree = new HorizontalSlice(split1, split2);
    const result = postOrder(tree);
    expect(result).toStrictEqual([leaf1,leaf2,split1,leaf3,leaf4,split2,tree]);
  });
  test("4 element square", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const leaf4 = new Leaf(4);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const split2 = new HorizontalSlice(leaf3,leaf4)
    const tree = new VerticalSlice(split1, split2);
    const result = postOrder(tree);
    expect(result).toStrictEqual([leaf1,leaf2,split1,leaf3,leaf4,split2,tree]);
  });
});
