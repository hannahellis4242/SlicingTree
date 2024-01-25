import Branch from "../src/options/Branch";
import Leaf from "../src/options/Leaf";
import NullNode from "../src/options/NullNode";
import createTree from "../src/options/createTree";
import getSplits from "../src/options/getSplits";

describe("tests", () => {
  describe("getSplits", () => {
    test("empty", () => {
      const result = getSplits([]);
      expect(result).toHaveLength(0);
    });
    test("1 element", () => {
      const result = getSplits([1]);
      expect(result).toHaveLength(0);
      expect(result).toStrictEqual([]);
    });
    test("2 elements", () => {
      const result = getSplits([1, 2]);
      expect(result).toHaveLength(1);
      expect(result).toStrictEqual([[[1], [2]]]);
    });
    test("3 elements", () => {
      const result = getSplits([1, 2, 3]);
      expect(result).toHaveLength(2);
      expect(result).toStrictEqual([
        [[1], [2, 3]],
        [[1, 2], [3]],
      ]);
    });
    test("4 elements", () => {
      const result = getSplits([1, 2, 3, 4]);
      expect(result).toHaveLength(3);
      expect(result).toStrictEqual([
        [[1], [2, 3, 4]],
        [
          [1, 2],
          [3, 4],
        ],
        [[1, 2, 3], [4]],
      ]);
    });
  });
  describe("createTree", () => {
    test("0 elements", () => {
      const result = createTree([]);
      expect(result).toBeInstanceOf(NullNode);
    });
    test("1 elements", () => {
      const result = createTree([1]);
      expect(result).toBeInstanceOf(Leaf);
      console.log(result);
    });
    test("2 elements", () => {
      const result = createTree([1, 2]);
      expect(result).toBeInstanceOf(Branch);
      console.log(result);
    });
    test("n elements", () => {
      const result = createTree([1, 2, 3,4,5,6]);
      expect(result).toBeInstanceOf(Branch);
    });
  });
});
