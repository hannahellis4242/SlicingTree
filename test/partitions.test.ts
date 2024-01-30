import partitions from "../src/partitioning/partitions";
describe("partitions", () => {
  test("empty", () => {
    const result = partitions([]);
    expect(result).toHaveLength(1);
  });
  test("one element", () => {
    const result = partitions([1]);
    expect(result).toHaveLength(2);
    expect(result).toStrictEqual([
      [[], [1]],
      [[1], []],
    ]);
  });
  test("two elements", () => {
    const result = partitions([1, 2]);
    expect(result).toHaveLength(4);
    expect(result).toStrictEqual([
      [[], [1, 2]],
      [[1], [2]],
      [[2], [1]],
      [[1, 2], []],
    ]);
  });
  test("three elements", () => {
    const result = partitions([1, 2, 3]);
    expect(result).toHaveLength(8);
    expect(result).toStrictEqual([
      [[], [1, 2, 3]],
      [[1], [2, 3]],
      [[2], [1, 3]],
      [[1, 2], [3]],
      [[3], [1, 2]],
      [[1, 3], [2]],
      [[2, 3], [1]],
      [[1, 2, 3], []],
    ]);
  });
  test("four elements", () => {
    const result = partitions([1, 2, 3, 4]);
    expect(result).toHaveLength(16);
    expect(result).toStrictEqual([
      [[], [1, 2, 3, 4]],
      [[1], [2, 3, 4]],
      [[2], [1, 3, 4]],
      [
        [1, 2],
        [3, 4],
      ],
      [[3], [1, 2, 4]],
      [
        [1, 3],
        [2, 4],
      ],
      [
        [2, 3],
        [1, 4],
      ],
      [[1, 2, 3], [4]],
      [[4], [1, 2, 3]],
      [
        [1, 4],
        [2, 3],
      ],
      [
        [2, 4],
        [1, 3],
      ],
      [[1, 2, 4], [3]],
      [
        [3, 4],
        [1, 2],
      ],
      [[1, 3, 4], [2]],
      [[2, 3, 4], [1]],
      [[1, 2, 3, 4], []],
    ]);
  });
});
