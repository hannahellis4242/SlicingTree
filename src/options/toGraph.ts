import { VertexDescriptor, addVertex, addEdge, DirectedGraph } from "graphts";
import Branch from "./Branch";
import Leaf from "./Leaf";
import OptionGraph from "./OptionGraph";
import OptionNode from "./OptionNode";

const createVertex = <T>(
  node: OptionNode,
  graph: OptionGraph<T>
): VertexDescriptor | undefined => {
  if (node instanceof Branch) {
    const u = addVertex(undefined, graph);
    const { children } = node;
    children.forEach((child) => {
      const { id, direction } = child;
      const v = createVertex(child, graph);
      if (v) {
        addEdge(u, v, { id, direction }, graph);
      }
    });
    return u;
  }

  if (node instanceof Leaf) {
    return addVertex(node.value, graph);
  }

  return undefined;
};

const toGraph = <T>(node: OptionNode): OptionGraph<T> => {
  const graph = new DirectedGraph<undefined, T | undefined, OptionNode>(
    undefined
  );
  createVertex(node, graph);
  return graph;
};
export default toGraph;
