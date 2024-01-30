import Leaf from "../src/SlicingTree/Leaf";
import HorizontalSlice from "../src/SlicingTree/HorizontalSlice";
import VerticalSlice from "../src/SlicingTree/VerticalSlice";
import SlicingTreeNode from "../src/SlicingTree/SlicingTreeNode";

interface Art {
  height: number;
  width: number;
  rows: string[];
}

const padStr = (str: string, len: number): string => {
  if (str.length >= len) {
    return str;
  }
  return str.concat(new Array(len - str.length).fill(" ").join(""));
};

const asciiArtHelper = (
  node: SlicingTreeNode,
  fn: <T>(leaf: Leaf<T>) => string
): Art => {
  if (node instanceof Leaf) {
    return { width: 1, height: 1, rows: [fn(node)] };
  }
  if (node instanceof HorizontalSlice) {
    const left = asciiArtHelper(node.left, fn);
    const right = asciiArtHelper(node.right, fn);
    const width = left.width + right.width + 1;
    const height = Math.max(left.height, right.height);
    let rows: string[] = [];
    for (let i = 0; i < height; ++i) {
      const leftRow =
        left.rows.at(i) || new Array(left.width).fill(" ").join("");
      const rightRow =
        right.rows.at(i) || new Array(right.width).fill(" ").join("");
      rows.push(`${leftRow}|${rightRow}`);
    }
    return { width, height, rows };
  }
  if (node instanceof VerticalSlice) {
    const upper = asciiArtHelper(node.upper, fn);
    const lower = asciiArtHelper(node.lower, fn);
    const width = Math.max(lower.width, upper.width);
    const height = upper.height + lower.height + 1;
    const rows = upper.rows
      .map((row) => padStr(row, width))
      .concat(new Array(width).fill("-").join(""))
      .concat(lower.rows.map((row) => padStr(row, width)));
    return { width, height, rows };
  }
  return { width: 0, height: 0, rows: [] };
};

const asciiArt = (
  node: SlicingTreeNode,
  fn: <T>(leaf: Leaf<T>) => string
): string => asciiArtHelper(node, fn).rows.join("\n");

describe("asciiArt", () => {
  describe("helper", () => {
    const showLeaf = <T>(leaf: Leaf<T>) => `${leaf.value}`;
    test("leaf 1", () => {
      const tree = new Leaf(1);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(1);
      expect(height).toBe(1);
      expect(rows).toStrictEqual(["1"]);
    });
    test("leaf 2", () => {
      const tree = new Leaf(2);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(1);
      expect(height).toBe(1);
      expect(rows).toStrictEqual(["2"]);
    });
    test("horizontal 1", () => {
      const left = new Leaf(1);
      const right = new Leaf(2);
      const tree = new HorizontalSlice(left, right);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(3);
      expect(height).toBe(1);
      expect(rows).toStrictEqual(["1|2"]);
    });
    test("horizontal 2", () => {
      const left = new Leaf(3);
      const right = new Leaf(4);
      const tree = new HorizontalSlice(left, right);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(3);
      expect(height).toBe(1);
      expect(rows).toStrictEqual(["3|4"]);
    });
    test("vertical", () => {
      const lower = new Leaf(1);
      const upper = new Leaf(2);
      const tree = new VerticalSlice(lower, upper);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(1);
      expect(height).toBe(3);
      expect(rows).toStrictEqual(["2", "-", "1"]);
    });
    test("row of three elements", () => {
      const leaf1 = new Leaf(1);
      const leaf2 = new Leaf(2);
      const leaf3 = new Leaf(3);
      const split1 = new HorizontalSlice(leaf1, leaf2);
      const tree = new HorizontalSlice(split1, leaf3);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(5);
      expect(height).toBe(1);
      expect(rows).toStrictEqual(["1|2|3"]);
    });
    test("column of three elements", () => {
      const leaf1 = new Leaf(1);
      const leaf2 = new Leaf(2);
      const leaf3 = new Leaf(3);
      const split1 = new VerticalSlice(leaf1, leaf2);
      const tree = new VerticalSlice(split1, leaf3);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(1);
      expect(height).toBe(5);
      expect(rows).toStrictEqual(["3", "-", "2", "-", "1"]);
    });
    test("row with a column of two elements and one element", () => {
      const leaf1 = new Leaf(1);
      const leaf2 = new Leaf(2);
      const leaf3 = new Leaf(3);
      const split1 = new VerticalSlice(leaf1, leaf2);
      const tree = new HorizontalSlice(split1, leaf3);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(3);
      expect(height).toBe(3);
      expect(rows).toStrictEqual(["2|3", "-| ", "1| "]);
    });
    test("square", () => {
      const leaf1 = new Leaf(1);
      const leaf2 = new Leaf(2);
      const leaf3 = new Leaf(3);
      const leaf4 = new Leaf(4);
      const split1 = new HorizontalSlice(leaf1, leaf2);
      const split2 = new HorizontalSlice(leaf3, leaf4);
      const tree = new VerticalSlice(split2, split1);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(3);
      expect(height).toBe(3);
      expect(rows).toStrictEqual(["1|2", "---", "3|4"]);
    });
    test("something a little more complex", () => {
      const leaf1 = new Leaf(1);
      const leaf2 = new Leaf(2);
      const leaf3 = new Leaf(3);
      const leaf4 = new Leaf(4);
      const leaf5 = new Leaf(5);
      const leaf6 = new Leaf(6);
      const split1 = new HorizontalSlice(leaf1, leaf2);
      const split2 = new HorizontalSlice(split1, leaf3);
      const split3 = new HorizontalSlice(leaf4, leaf5);
      const split4 = new VerticalSlice(split3, split2);
      const tree = new VerticalSlice(leaf6, split4);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(5);
      expect(height).toBe(5);
      expect(rows).toStrictEqual(["1|2|3", "-----", "4|5  ", "-----", "6    "]);
    });
    test("something else a little more complex", () => {
      const leaf1 = new Leaf(1);
      const leaf2 = new Leaf(2);
      const leaf3 = new Leaf(3);
      const leaf4 = new Leaf(4);
      const leaf5 = new Leaf(5);
      const leaf6 = new Leaf(6);
      const split1 = new HorizontalSlice(leaf1, leaf2);
      const split2 = new HorizontalSlice(split1, leaf3);
      const split3 = new HorizontalSlice(leaf4, leaf5);
      const split4 = new VerticalSlice(split3, split2);
      const tree = new HorizontalSlice(split4, leaf6);
      const { width, height, rows } = asciiArtHelper(tree, showLeaf);
      expect(width).toBe(7);
      expect(height).toBe(3);
      expect(rows).toStrictEqual(["1|2|3|6", "-----| ", "4|5  | "]);
    });
  });
});
