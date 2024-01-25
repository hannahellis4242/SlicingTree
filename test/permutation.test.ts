import permutation from "../src/utils/permutation";

describe("permutation", () => {
  test("empty", () => {
    const result = permutation([]);
    expect(result).toHaveLength(1);
  });
  test("one element", () => {
    const result = permutation([1]);
    expect(result).toHaveLength(1);
  });
  test("two elements", () => {
    const result = permutation([1, 2]);
    expect(result).toHaveLength(2);
    expect(result).toStrictEqual([
      [1, 2],
      [2, 1],
    ]);
  });
  test("three elements", () => {
    const result = permutation([1, 2, 3]);
    expect(result).toHaveLength(6);
    expect(result).toStrictEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });
  test("four elements", () => {
    const result = permutation([1, 2, 3, 4]);
    expect(result).toHaveLength(24);
    expect(result).toStrictEqual([
      [1, 2, 3, 4],
      [1, 2, 4, 3],
      [1, 3, 2, 4],
      [1, 3, 4, 2],
      [1, 4, 2, 3],
      [1, 4, 3, 2],
      [2, 1, 3, 4],
      [2, 1, 4, 3],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
      [2, 4, 1, 3],
      [2, 4, 3, 1],
      [3, 1, 2, 4],
      [3, 1, 4, 2],
      [3, 2, 1, 4],
      [3, 2, 4, 1],
      [3, 4, 1, 2],
      [3, 4, 2, 1],
      [4, 1, 2, 3],
      [4, 1, 3, 2],
      [4, 2, 1, 3],
      [4, 2, 3, 1],
      [4, 3, 1, 2],
      [4, 3, 2, 1],
    ]);
  });
});
