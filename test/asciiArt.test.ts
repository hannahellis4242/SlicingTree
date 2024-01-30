import Leaf from "../src/SlicingTree/Leaf";
import HorizontalSlice from "../src/SlicingTree/HorizontalSlice";
import VerticalSlice from "../src/SlicingTree/VerticalSlice";
import asciiArt from "../src/SlicingTree/asciiArt";

describe("asciiArt", () => {
  const showLeaf = <T>(leaf: Leaf<T>) => `${leaf.value}`;
  test("leaf 1", () => {
    const tree = new Leaf(1);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("1");
  });
  test("leaf 2", () => {
    const tree = new Leaf(2);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("2");
  });
  test("horizontal 1", () => {
    const left = new Leaf(1);
    const right = new Leaf(2);
    const tree = new HorizontalSlice(left, right);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("1|2");
  });
  test("horizontal 2", () => {
    const left = new Leaf(3);
    const right = new Leaf(4);
    const tree = new HorizontalSlice(left, right);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("3|4");
  });
  test("vertical", () => {
    const lower = new Leaf(1);
    const upper = new Leaf(2);
    const tree = new VerticalSlice(lower, upper);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("2\n-\n1");
  });
  test("row of three elements", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const tree = new HorizontalSlice(split1, leaf3);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("1|2|3");
  });
  test("column of three elements", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new VerticalSlice(leaf1, leaf2);
    const tree = new VerticalSlice(split1, leaf3);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("3\n-\n2\n-\n1");
  });
  test("row with a column of two elements and one element", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const split1 = new VerticalSlice(leaf1, leaf2);
    const tree = new HorizontalSlice(split1, leaf3);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("2|3\n-| \n1| ");
  });
  test("square", () => {
    const leaf1 = new Leaf(1);
    const leaf2 = new Leaf(2);
    const leaf3 = new Leaf(3);
    const leaf4 = new Leaf(4);
    const split1 = new HorizontalSlice(leaf1, leaf2);
    const split2 = new HorizontalSlice(leaf3, leaf4);
    const tree = new VerticalSlice(split2, split1);
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("1|2\n---\n3|4");
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
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("1|2|3\n-----\n4|5  \n-----\n6    ");
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
    const result = asciiArt(tree, showLeaf);
    expect(result).toBe("1|2|3|6\n-----| \n4|5  | ");
  });
});
