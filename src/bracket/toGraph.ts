import { DirectedGraph, VertexDescriptor, addVertex, addEdge } from "graphts";
import Bracket from "./Bracket";
import BracketNode from "./BracketNode";
import Leaf from "./Leaf";
import BracketGraph, { Direction } from "./BracketGraph";

const createVertex = <T>(
  node: BracketNode<T>,
  graph: BracketGraph<T> = new DirectedGraph<undefined, T, Direction>(
    undefined
  ),
  parent?: [VertexDescriptor, Direction]
): VertexDescriptor | undefined => {
  if (node instanceof Bracket) {
    const vertex = addVertex(undefined, graph);
    const left = createVertex(node.left, graph, [vertex, "left"]);
    const right = createVertex(node.right, graph, [vertex, "right"]);
    if (parent) {
      addEdge(parent[0], vertex, parent[1], graph);
    }
    return vertex;
  }
  if (node instanceof Leaf) {
    const vertex = addVertex(node.value, graph);
    if (parent) {
      addEdge(parent[0], vertex, parent[1], graph);
    }
    return vertex;
  }
  return undefined;
};

const toGraph = <T>(node: BracketNode<T>): BracketGraph<T> => {
  const graph = new DirectedGraph<undefined, T | undefined, Direction>(
    undefined
  );
  createVertex(node, graph);
  return graph;
};
export default toGraph;
