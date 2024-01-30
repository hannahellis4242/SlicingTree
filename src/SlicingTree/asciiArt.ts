import HorizontalSlice from "./HorizontalSlice";
import Leaf from "./Leaf";
import SlicingTreeNode from "./SlicingTreeNode";
import VerticalSlice from "./VerticalSlice";

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
export default asciiArt;
