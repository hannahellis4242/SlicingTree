import partitions from "../src/partitioning/partitions";
describe("partition", () => {
  test("empty", () => {
    const results = partitions([]);
    expect(results).toHaveLength(1);
    expect(results).toStrictEqual([[[], []]]);
  });
  test("1 element", () => {
    const results = partitions([1]);
    expect(results).toHaveLength(2);
    expect(results).toStrictEqual([
      [[1], []],
      [[], [1]],
    ]);
  });
  test("2 element", () => {
    const results = partitions([1, 2]);
    expect(results).toHaveLength(4);
    expect(results).toStrictEqual([
      [[1, 2], []],
      [[2], [1]],
      [[1], [2]],
      [[], [1, 2]],
    ]);
  });
  test("3 element", () => {
    const results = partitions([1, 2, 3]);
    expect(results).toHaveLength(8);
    expect(results).toStrictEqual([
      [[1, 2, 3], []],
      [[2, 3], [1]],
      [[1, 3], [2]],
      [[3], [1, 2]],
      [[1, 2], [3]],
      [[2], [1, 3]],
      [[1], [2, 3]],
      [[], [1, 2, 3]],
    ]);
  });
  test("4 element", () => {
    const results = partitions([1, 2, 3, 4]);
    expect(results).toHaveLength(16);
    expect(results).toStrictEqual([
      [[1, 2, 3, 4], []],
      [[2, 3, 4], [1]],
      [[1, 3, 4], [2]],
      [
        [3, 4],
        [1, 2],
      ],
      [[1, 2, 4], [3]],
      [
        [2, 4],
        [1, 3],
      ],
      [
        [1, 4],
        [2, 3],
      ],
      [[4], [1, 2, 3]],
      [[1, 2, 3], [4]],
      [
        [2, 3],
        [1, 4],
      ],
      [
        [1, 3],
        [2, 4],
      ],
      [[3], [1, 2, 4]],
      [
        [1, 2],
        [3, 4],
      ],
      [[2], [1, 3, 4]],
      [[1], [2, 3, 4]],
      [[], [1, 2, 3, 4]],
    ]);
  });

  test("5 element", () => {
    const results = partitions([1, 2, 3, 4, 5]);
    expect(results).toHaveLength(32);
    expect(results).toStrictEqual([
      [[1, 2, 3, 4, 5], []],
      [[2, 3, 4, 5], [1]],
      [[1, 3, 4, 5], [2]],
      [
        [3, 4, 5],
        [1, 2],
      ],
      [[1, 2, 4, 5], [3]],
      [
        [2, 4, 5],
        [1, 3],
      ],
      [
        [1, 4, 5],
        [2, 3],
      ],
      [
        [4, 5],
        [1, 2, 3],
      ],
      [[1, 2, 3, 5], [4]],
      [
        [2, 3, 5],
        [1, 4],
      ],
      [
        [1, 3, 5],
        [2, 4],
      ],
      [
        [3, 5],
        [1, 2, 4],
      ],
      [
        [1, 2, 5],
        [3, 4],
      ],
      [
        [2, 5],
        [1, 3, 4],
      ],
      [
        [1, 5],
        [2, 3, 4],
      ],
      [[5], [1, 2, 3, 4]],
      [[1, 2, 3, 4], [5]],
      [
        [2, 3, 4],
        [1, 5],
      ],
      [
        [1, 3, 4],
        [2, 5],
      ],
      [
        [3, 4],
        [1, 2, 5],
      ],
      [
        [1, 2, 4],
        [3, 5],
      ],
      [
        [2, 4],
        [1, 3, 5],
      ],
      [
        [1, 4],
        [2, 3, 5],
      ],
      [[4], [1, 2, 3, 5]],
      [
        [1, 2, 3],
        [4, 5],
      ],
      [
        [2, 3],
        [1, 4, 5],
      ],
      [
        [1, 3],
        [2, 4, 5],
      ],
      [[3], [1, 2, 4, 5]],
      [
        [1, 2],
        [3, 4, 5],
      ],
      [[2], [1, 3, 4, 5]],
      [[1], [2, 3, 4, 5]],
      [[], [1, 2, 3, 4, 5]],
    ]);
  });
});
