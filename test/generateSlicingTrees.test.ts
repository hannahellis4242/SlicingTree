import {
  DirectedGraph,
  EdgeDescriptor,
  VertexDescriptor,
  addEdge,
  addVertex,
} from "graphts";
import toDot, { DotWriter } from "../src/toDot";
import partitions from "../src/partitioning/partitions";
import Partition from "../src/partitioning/Partition";

interface SlicingTreeNode {}

class Leaf<T> implements SlicingTreeNode {
  constructor(public readonly value: T) {}
}

class Slice implements SlicingTreeNode {
  constructor() {}
}

class HorizontalSlice extends Slice {
  constructor(
    public readonly left: SlicingTreeNode,
    public readonly right: SlicingTreeNode
  ) {
    super();
  }
}

class VerticalSlice extends Slice {
  constructor(
    public readonly lower: SlicingTreeNode,
    public readonly upper: SlicingTreeNode
  ) {
    super();
  }
}

type SliceDirection = "H" | "V";
type EdgeLabels = "left" | "right" | "lower" | "upper";
type SlicingTreeGraph<T> = DirectedGraph<
  undefined,
  T | SliceDirection | undefined,
  EdgeLabels
>;

const createVertex = <T>(
  node: SlicingTreeNode,
  graph: SlicingTreeGraph<T>
): VertexDescriptor => {
  if (node instanceof Leaf) {
    return addVertex(node.value, graph);
  }
  if (node instanceof VerticalSlice) {
    const v = addVertex("V", graph);
    const lower = createVertex(node.lower, graph);
    addEdge(v, lower, "lower", graph);
    const upper = createVertex(node.upper, graph);
    addEdge(v, upper, "upper", graph);
    return v;
  }
  if (node instanceof HorizontalSlice) {
    const v = addVertex("H", graph);
    const left = createVertex(node.left, graph);
    addEdge(v, left, "left", graph);
    const right = createVertex(node.right, graph);
    addEdge(v, right, "right", graph);
    return v;
  }
  return addVertex(undefined, graph);
};

const toGraph = <T>(node: SlicingTreeNode): SlicingTreeGraph<T> => {
  const graph = new DirectedGraph<
    undefined,
    T | SliceDirection | undefined,
    EdgeLabels
  >(undefined);
  createVertex(node, graph);
  return graph;
};

class SlicingTreeWriter<T>
  implements DotWriter<undefined, T | SliceDirection | undefined, EdgeLabels>
{
  constructor(private readonly graph: SlicingTreeGraph<T>) {}
  writeGraph(): string {
    return "";
  }
  writeVertex(v: VertexDescriptor): string {
    const node = this.graph.getVertexData(v);
    return `[label="${node}"]`;
  }
  writeEdge(e: EdgeDescriptor): string {
    const edge = this.graph.getEdgeData(e);
    if (edge) {
      return `[label="${edge}"]`;
    }
    return "";
  }
}

const createTrees = <T>(items: T[]): SlicingTreeNode[] => {
  if (items.length === 0) {
    return [];
  }
  if (items.length === 1) {
    return [new Leaf(items[0])];
  }
  /*if (items.length === 2) {
    const child1 = new Leaf(items[0]);
    const child2 = new Leaf(items[1]);
    const slice1 = new HorizontalSlice(child1, child2);
    const slice2 = new HorizontalSlice(child2, child1);
    const slice3 = new VerticalSlice(child1, child2);
    const slice4 = new VerticalSlice(child2, child1);
    return [slice1, slice2, slice3, slice4];
  }*/
  return partitions(items)
    .filter(([x, _]) => x.length !== 0)
    .filter(([_, x]) => x.length !== 0)
    .flatMap(([xs, ys]) =>
      createTrees(xs)
        .map((x) => createTrees(ys).flatMap((y) => [x, y]))
        .flatMap(([x, y]) => [
          new HorizontalSlice(x, y),
          new VerticalSlice(x, y),
        ])
    );
};

const showResults = (result: SlicingTreeNode[]) => {
  console.log(
    result
      .map((tree, i) => {
        let out = "";
        out += `--------------------${i}--------------------\n`;
        const graph = toGraph(tree);
        out += toDot(graph, new SlicingTreeWriter(graph)) + "\n";

        out += `====================${i}====================\n`;
        return out;
      })
      .join("\n")
  );
};

describe("createTrees", () => {
  test("empty", () => {
    const result = createTrees([]);
    expect(result).toHaveLength(0);
  });
  test("1 item", () => {
    const result = createTrees([1]);
    expect(result).toHaveLength(1);
    showResults(result);
  });
  test("2 item", () => {
    const result = createTrees([1, 2]);
    expect(result).toHaveLength(4);
    showResults(result);
  });
  test("3 item", () => {
    const result = createTrees([1, 2, 3]);
    showResults(result);
    expect(result).toHaveLength(4);
  });
});
