import Graph, {
    DirectedGraph,
  EdgeDescriptor,
  UndirectedGraph,
  VertexDescriptor,
  addEdge,
  addVertex,
  edges,
  source,
  target,
  vertices,
} from "graphts";
import { generate } from "randomized-string";

interface DotWriter<G, V, E> {
  writeGraph(g: Graph<G, V, E>): string;
  writeVertex(v: VertexDescriptor): string;
  writeEdge(e: EdgeDescriptor): string;
}

interface GraphData {
  name: string;
}

interface VertexData {
  name: string;
}

interface EdgeData {
  name: string;
}

class MockWriter<G, V, E> implements DotWriter<G, V, E> {
  constructor() {}
  writeGraph = jest.fn();
  writeVertex = jest.fn();
  writeEdge = jest.fn();
}

const toDot = <G, V, E>(
  graph: Graph<G, V, E>,
  writer: DotWriter<G, V, E>
): string => {
  const symbol = graph instanceof UndirectedGraph ? "--" : "->";
  let vertexCounter = 1;
  const vertexToLabelMap = new Map<VertexDescriptor, number>();

  let output = "graph graph {\n";
  output += writer.writeGraph(graph) + "\n";
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

describe("toDot", () => {
  let mock = new MockWriter();
  const graphStr = generate(6);
  beforeEach(() => {
    mock = new MockWriter();
    mock.writeGraph.mockReturnValue(graphStr);
  });
  describe("undirected", () => {
    test("empty", () => {
      const graph = new UndirectedGraph<GraphData, VertexData, EdgeData>({
        name: "empty graph",
      });

      const result = toDot(graph, mock);
      expect(mock.writeGraph).toHaveBeenCalledTimes(1);
      expect(mock.writeGraph).toHaveBeenCalledWith(graph);

      expect(result).toBe(`graph graph {\n${graphStr}\n}`);
    });
    test("one vertex", () => {
      const vertexStr = generate(4);
      mock.writeVertex.mockReturnValueOnce(vertexStr);
      const graph = new UndirectedGraph<GraphData, VertexData, EdgeData>({
        name: "single vertex graph",
      });
      addVertex({ name: "A" }, graph);
      const result = toDot(graph, mock);
      expect(mock.writeGraph).toHaveBeenCalledTimes(1);
      expect(mock.writeGraph).toHaveBeenCalledWith(graph);
      expect(mock.writeVertex).toHaveBeenCalledTimes(1);
      expect(result).toBe(`graph graph {\n${graphStr}\n1 ${vertexStr};\n}`);
    });
    test("one vertex and one edge", () => {
      const vertexStr = generate(4);
      const edgeStr = generate(2);
      mock.writeVertex.mockReturnValueOnce(vertexStr);
      mock.writeEdge.mockReturnValueOnce(edgeStr);
      const graph = new UndirectedGraph<GraphData, VertexData, EdgeData>({
        name: "single vertex graph",
      });
      const v = addVertex({ name: "A" }, graph);
      const e = addEdge(v, v, { name: "a" }, graph);
      const result = toDot(graph, mock);
      console.log(result);
      expect(mock.writeGraph).toHaveBeenCalledTimes(1);
      expect(mock.writeGraph).toHaveBeenCalledWith(graph);
      expect(mock.writeVertex).toHaveBeenCalledTimes(1);
      expect(mock.writeVertex).toHaveBeenCalledWith(v);
      expect(mock.writeEdge).toHaveBeenCalledTimes(1);
      expect(mock.writeEdge).toHaveBeenCalledWith(e);
      expect(result).toBe(
        `graph graph {\n${graphStr}\n1 ${vertexStr};\n1 -- 1 ${edgeStr};\n}`
      );
    });
    test("two vertices and one edge", () => {
        const vertex1Str = generate(4);
        const vertex2Str = generate(4);
        const edgeStr = generate(2);
        mock.writeVertex.mockReturnValueOnce(vertex1Str);
        mock.writeVertex.mockReturnValueOnce(vertex2Str);
        mock.writeEdge.mockReturnValueOnce(edgeStr);
        const graph = new UndirectedGraph<GraphData, VertexData, EdgeData>({
          name: "vertex graph",
        });
        const u = addVertex({ name: "B" }, graph);
        const v = addVertex({ name: "A" }, graph);
        const e = addEdge(u, v, { name: "a" }, graph);
        const result = toDot(graph, mock);
        console.log(result);
        expect(mock.writeGraph).toHaveBeenCalledTimes(1);
        expect(mock.writeGraph).toHaveBeenCalledWith(graph);
        expect(mock.writeVertex).toHaveBeenCalledTimes(2);
        expect(mock.writeVertex).toHaveBeenCalledWith(v);
        expect(mock.writeVertex).toHaveBeenCalledWith(u);
        expect(mock.writeEdge).toHaveBeenCalledTimes(1);
        expect(mock.writeEdge).toHaveBeenCalledWith(e);
        expect(result).toBe(
          `graph graph {\n${graphStr}\n1 ${vertex1Str};\n2 ${vertex2Str};\n1 -- 2 ${edgeStr};\n}`
        );
      });
  });
  describe("directed", () => {
    test("empty", () => {
      const graph = new DirectedGraph<GraphData, VertexData, EdgeData>({
        name: "empty graph",
      });

      const result = toDot(graph, mock);
      expect(mock.writeGraph).toHaveBeenCalledTimes(1);
      expect(mock.writeGraph).toHaveBeenCalledWith(graph);

      expect(result).toBe(`graph graph {\n${graphStr}\n}`);
    });
    test("one vertex", () => {
      const vertexStr = generate(4);
      mock.writeVertex.mockReturnValueOnce(vertexStr);
      const graph = new UndirectedGraph<GraphData, VertexData, EdgeData>({
        name: "single vertex graph",
      });
      addVertex({ name: "A" }, graph);
      const result = toDot(graph, mock);
      expect(mock.writeGraph).toHaveBeenCalledTimes(1);
      expect(mock.writeGraph).toHaveBeenCalledWith(graph);
      expect(mock.writeVertex).toHaveBeenCalledTimes(1);
      expect(result).toBe(`graph graph {\n${graphStr}\n1 ${vertexStr};\n}`);
    });
    test("one vertex and one edge", () => {
      const vertexStr = generate(4);
      const edgeStr = generate(2);
      mock.writeVertex.mockReturnValueOnce(vertexStr);
      mock.writeEdge.mockReturnValueOnce(edgeStr);
      const graph = new DirectedGraph<GraphData, VertexData, EdgeData>({
        name: "single vertex graph",
      });
      const v = addVertex({ name: "A" }, graph);
      const e = addEdge(v, v, { name: "a" }, graph);
      const result = toDot(graph, mock);
      console.log(result);
      expect(mock.writeGraph).toHaveBeenCalledTimes(1);
      expect(mock.writeGraph).toHaveBeenCalledWith(graph);
      expect(mock.writeVertex).toHaveBeenCalledTimes(1);
      expect(mock.writeVertex).toHaveBeenCalledWith(v);
      expect(mock.writeEdge).toHaveBeenCalledTimes(1);
      expect(mock.writeEdge).toHaveBeenCalledWith(e);
      expect(result).toBe(
        `graph graph {\n${graphStr}\n1 ${vertexStr};\n1 -> 1 ${edgeStr};\n}`
      );
    });
    test("two vertices and one edge", () => {
        const vertex1Str = generate(4);
        const vertex2Str = generate(4);
        const edgeStr = generate(2);
        mock.writeVertex.mockReturnValueOnce(vertex1Str);
        mock.writeVertex.mockReturnValueOnce(vertex2Str);
        mock.writeEdge.mockReturnValueOnce(edgeStr);
        const graph = new DirectedGraph<GraphData, VertexData, EdgeData>({
          name: "vertex graph",
        });
        const u = addVertex({ name: "B" }, graph);
        const v = addVertex({ name: "A" }, graph);
        const e = addEdge(u, v, { name: "a" }, graph);
        const result = toDot(graph, mock);
        console.log(result);
        expect(mock.writeGraph).toHaveBeenCalledTimes(1);
        expect(mock.writeGraph).toHaveBeenCalledWith(graph);
        expect(mock.writeVertex).toHaveBeenCalledTimes(2);
        expect(mock.writeVertex).toHaveBeenCalledWith(v);
        expect(mock.writeVertex).toHaveBeenCalledWith(u);
        expect(mock.writeEdge).toHaveBeenCalledTimes(1);
        expect(mock.writeEdge).toHaveBeenCalledWith(e);
        expect(result).toBe(
          `graph graph {\n${graphStr}\n1 ${vertex1Str};\n2 ${vertex2Str};\n1 -> 2 ${edgeStr};\n}`
        );
      });
  });
});
