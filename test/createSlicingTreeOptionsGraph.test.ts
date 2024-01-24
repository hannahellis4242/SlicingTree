import { vertices } from "graphts";
import root from "../src/utils/root";
import BlockOption from "../src/option/BlockOption";
import createSlicingTreeOptionsGraph from "../src/option/createSlicingTreeOptionsGraph";

describe("createSlicingTreeOptionsGraph", () => {
    test("empty", () => {
      const slicingTree = createSlicingTreeOptionsGraph([]);
      expect(vertices(slicingTree)).toHaveLength(1);
    });
    test("single block", () => {
      const blocks:BlockOption[] = [{label:"A"}];
      const slicingTree = createSlicingTreeOptionsGraph(blocks);
      const vs = vertices(slicingTree);
      expect(vs).toHaveLength(2);
      const r = root(slicingTree);
    });

    test("two blocks", () => {
      const blocks:BlockOption[] = [{label:"A"},{label:"B"}];
      const slicingTree = createSlicingTreeOptionsGraph(blocks);
      const vs = vertices(slicingTree);
      expect(vs).toHaveLength(11);
    });
});