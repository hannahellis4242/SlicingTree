import { mkdir, writeFile } from "fs/promises";
import { SlicingTreeWriter, toGraph } from "./SlicingTree/SlicingTreeGraph";
import SlicingTreeNode from "./SlicingTree/SlicingTreeNode";
import createTrees from "./SlicingTree/createTrees";
import { join } from "path";
import { toDot } from "graphts";
import polish from "./SlicingTree/polish";
/*
const saveResults = async (result: SlicingTreeNode[], resultPath: string) => {
  await mkdir(resultPath);
  await Promise.all(
    result
      .map(toGraph)
      .map((graph) => toDot(graph, new SlicingTreeWriter(graph)))
      .map((text, i) => writeFile(join(resultPath, `graph${i}.dot`), text))
  );
};*/

writeFile("solutions.txt",createTrees([1,2,3]).map(x=>polish(x,(leaf)=>`${leaf.value}`)).join("\n"));

/*const result = createTrees([1, 2]);
saveResults(result, "SlicingTrees");*/
