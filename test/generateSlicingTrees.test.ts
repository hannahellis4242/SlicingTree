import SlicingTreeNode from "../src/slicingTree/SlicingTreeNode";
import createTrees from "../src/slicingTree/createTrees";

describe("createTrees", () => {
  test("empty", () => {
    const result = createTrees([]);
    expect(result).toHaveLength(0);
  });
  test("1 item", () => {
    const result = createTrees([1]);
    expect(result).toHaveLength(1);
  });
  test("2 item", () => {
    const result = createTrees([1, 2]);
    expect(result).toHaveLength(4);
  });
  /*test("3 item", () => {
    const result = createTrees([1, 2, 3]);
    expect(result).toHaveLength(4);
  });*/
});
