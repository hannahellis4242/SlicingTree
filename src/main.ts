/*import { exit } from "process";
import Bracket from "./bracket/Bracket";
import BracketNode from "./bracket/BracketNode";
import BracketWriter from "./bracket/BracketWriter";
import start from "./bracket/start";
import toGraph from "./bracket/toGraph";
import toDot from "./toDot";

const rotate = <T>(orig: BracketNode<T>): BracketNode<T> | undefined => {
  if (!(orig instanceof Bracket)) {
    return undefined;
  }
  if (!(orig.right instanceof Bracket)) {
    return undefined;
  }
  const copy = orig.clone();
  if (!(copy instanceof Bracket)) {
    return undefined;
  }

  const x = copy;
  const y = copy.right;
  if (!(y instanceof Bracket)) {
    return undefined;
  }
  const z = y.left;
  y.left = x;
  x.right = z;

  return y;
};

let tree = start([1, 2, 3, 4, 5, 6]);
if (!tree) {
  exit(1);
}

while (tree) {
  console.log("---------------");
  const graph = toGraph(tree);
  const out = toDot(graph, new BracketWriter(graph));

  console.log(out);
  tree = rotate(tree);
  console.log("===============");
}

import toGraph from "./options/toGraph";
import createTree from "./options/createTree";
import OptionWriter from "./options/OptionWriter";
import toDot from "./toDot";

const result = createTree([1, 2, 3, 4, 5, 6]);

const graph = toGraph(result);
const out = toDot(graph, new OptionWriter(graph));

console.log(out);*/

import { mkdir, writeFile } from "fs/promises";
import { SlicingTreeWriter, toGraph } from "./SlicingTree/SlicingTreeGraph";
import SlicingTreeNode from "./SlicingTree/SlicingTreeNode";
import createTrees from "./SlicingTree/createTrees";
import { join } from "path";
import { toDot } from "graphts";

const saveResults = async (result: SlicingTreeNode[], resultPath: string) => {
  await mkdir(resultPath);
  await Promise.all(
    result
      .map(toGraph)
      .map((graph) => toDot(graph, new SlicingTreeWriter(graph)))
      .map((text, i) => writeFile(join(resultPath, `graph${i}.dot`), text))
  );
};

const result = createTrees([1, 2, 3]);
saveResults(result, "SlicingTrees");
