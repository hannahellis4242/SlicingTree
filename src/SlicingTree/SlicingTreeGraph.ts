import { DirectedGraph, EdgeDescriptor, VertexDescriptor, addEdge, addVertex } from "graphts";
import HorizontalSlice from "./HorizontalSlice";
import Leaf from "./Leaf";
import SlicingTreeNode from "./SlicingTreeNode";
import VerticalSlice from "./VerticalSlice";
import { DotWriter } from "graphts";

type SliceDirection = "H" | "V";
type EdgeLabels = "left" | "right" | "lower" | "upper";
type SlicingTreeGraph<T> = DirectedGraph<
  undefined,
  T | SliceDirection | undefined,
  EdgeLabels
>;

export default SlicingTreeGraph;

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

export const toGraph = <T>(node: SlicingTreeNode): SlicingTreeGraph<T> => {
  const graph = new DirectedGraph<
    undefined,
    T | SliceDirection | undefined,
    EdgeLabels
  >(undefined);
  createVertex(node, graph);
  return graph;
};

export class SlicingTreeWriter<T>
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