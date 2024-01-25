import Bracket from "../src/bracket/Bracket";
import BracketNode, { show } from "../src/bracket/BracketNode";
import Leaf from "../src/bracket/Leaf";
import toGraph from "../src/bracket/toGraph";
import BracketWriter from "../src/bracket/BracketWriter";
import start from "../src/bracket/start";
import toDot from "../src/toDot";

describe("bracketing", () => {
  describe("start", () => {
    const showNumberNode = (x: BracketNode<number>): string => {
      if (x instanceof Leaf) {
        return x.value.toString();
      }
      if (x instanceof Bracket) {
        return "|";
      }
      return "";
    };
    const showTree = (x: BracketNode<number>) => show(x, showNumberNode, "");
    test("empty", () => {
      const result = start([]);
      expect(result).toBeUndefined;
    });
    test("1 element", () => {
      const result = start([1]);
      expect(result).toBeInstanceOf(Leaf);
      expect(showTree(result!)).toBe("1");
    });
    test("2 elements", () => {
      const result = start([1, 2]);
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Bracket);
      const graph = toGraph(result!);
      const out = toDot(graph,new BracketWriter(graph));
      console.log(out);
      expect(showTree(result!)).toBe("12|");
    });
    test("3 elements", () => {
      const result = start([1, 2, 3]);
      console.log(result);
      console.log(showTree(result!));
      expect(result).toBeDefined;
      const graph = toGraph(result!);
      const out = toDot(graph,new BracketWriter(graph));
      console.log(out);
      expect(showTree(result!)).toBe("123||");
    });
    test("4 elements", () => {
        const result = start([1, 2, 3,4]);
        console.log(result);
        console.log(showTree(result!));
        expect(result).toBeDefined;
        const graph = toGraph(result!);
        const out = toDot(graph,new BracketWriter(graph));
        console.log(out);
        expect(showTree(result!)).toBe("1234|||");
      });
  });
});
