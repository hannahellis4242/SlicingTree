import createTrees from "../src/SlicingTree/createTrees";
import polish from "../src/SlicingTree/polish";
describe("createTree", () => {
  test("empty", () => {
    const result = createTrees([]);
    expect(result).toHaveLength(0);
  });
  test("1 element", () => {
    const result = createTrees([1]);
    expect(result).toHaveLength(1);
    console.log(
      result.map((x) => polish(x, (leaf) => `${leaf.value}`)).join("\n")
    );
  });
  test("2 elements", () => {
    const result = createTrees([1, 2]);
    expect(result).toHaveLength(4);
    const trees = result.map((x) => polish(x, (leaf) => `${leaf.value}`));
    expect(trees).toStrictEqual(["12H", "12V", "21H", "21V"]);
  });
  test("3 elements", () => {
    const result = createTrees([1, 2, 3]);
    expect(result).toHaveLength(48);
    const trees = result.map((x) => polish(x, (leaf) => `${leaf.value}`));
    expect(trees).toStrictEqual([
      "123HH",
      "123HV",
      "123VH",
      "123VV",
      "132HH",
      "132HV",
      "132VH",
      "132VV",
      "213HH",
      "213HV",
      "213VH",
      "213VV",
      "231HH",
      "231HV",
      "231VH",
      "231VV",
      "12H3H",
      "12H3V",
      "12V3H",
      "12V3V",
      "21H3H",
      "21H3V",
      "21V3H",
      "21V3V",
      "312HH",
      "312HV",
      "312VH",
      "312VV",
      "321HH",
      "321HV",
      "321VH",
      "321VV",
      "13H2H",
      "13H2V",
      "13V2H",
      "13V2V",
      "31H2H",
      "31H2V",
      "31V2H",
      "31V2V",
      "23H1H",
      "23H1V",
      "23V1H",
      "23V1V",
      "32H1H",
      "32H1V",
      "32V1H",
      "32V1V",
    ]);
  });
});
