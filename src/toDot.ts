import Graph, { UndirectedGraph, VertexDescriptor, vertices, edges, source, target, EdgeDescriptor } from "graphts";

const toDot = <G, V, E>(
    graph: Graph<G, V, E>,
    writer: DotWriter<G, V, E>
  ): string => {
    const graphType = graph instanceof UndirectedGraph ? "graph" : "digraph";
    const symbol = graph instanceof UndirectedGraph ? "--" : "->";
    let vertexCounter = 1;
    const vertexToLabelMap = new Map<VertexDescriptor, number>();
  
    let output = graphType + " name {\n";
    output += writer.writeGraph() + "\n";
    vertices(graph).forEach((vertex) => {
      const label = vertexCounter++;
      vertexToLabelMap.set(vertex, label);
      output += `${label} ${writer.writeVertex(vertex)};\n`;
    });
    edges(graph).forEach((edge) => {
      const s = source(edge, graph);
      const t = target(edge, graph);
      if (!s || !t) {
        return;
      }
      const sourceLabel = vertexToLabelMap.get(s);
      const targetLabel = vertexToLabelMap.get(t);
      if (!sourceLabel || !sourceLabel) {
        return;
      }
      output += `${sourceLabel} ${symbol} ${targetLabel} ${writer.writeEdge(
        edge
      )};\n`;
    });
    output += "}";
    return output;
  };
  export interface DotWriter<G, V, E> {
    writeGraph(): string;
    writeVertex(v: VertexDescriptor): string;
    writeEdge(e: EdgeDescriptor): string;
  }
  export default toDot;