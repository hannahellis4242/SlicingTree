import Graph, { DirectedGraph, EdgeDescriptor, VertexDescriptor, addEdge, addVertex } from "graphts";
import toDot, {DotWriter} from "../src/toDot";

type Direction = "left" | "right";

interface OptionNode<T> {
  id?: number;
  direction?: Direction;
}

class NullNode<T> implements OptionNode<T> {
  constructor() {}
}

class Leaf<T> implements OptionNode<T> {
  constructor(
    public readonly value: T,
    public readonly id?: number,
    public readonly direction?: Direction
  ) {}
}

class Branch<T> implements OptionNode<T> {
  constructor(
    public readonly children: OptionNode<T>[],
    public readonly id?: number,
    public readonly direction?: Direction,
  ) {}
}

const getSplits = <T>(xs: T[]): T[][][] => {
  if (xs.length < 2) {
    return [];
  }
  return new Array(xs.length - 1).fill(0).map((_, i) => {
    const firstHalf = xs.slice(0, i + 1);
    const secondHalf = xs.slice(i + 1);
    return [firstHalf, secondHalf];
  });
};

const createTree = <T>(
  values: T[],
  id?: number,
  direction?: Direction
): OptionNode<T> => {
  if (values.length === 0) {
    return new NullNode();
  }
  if (values.length === 1) {
    return new Leaf(values[0],id,direction);
  }
  const children = getSplits(values).flatMap(
    ([leftOptions, rightOptions], id) => {
      const leftChild = createTree(leftOptions, id, "left");
      const rightChild = createTree(rightOptions, id, "right");
      return [leftChild, rightChild];
    }
  );
  return new Branch(children,id, direction);
};

interface IdAndDirection{
    id?:number,
    direction?:Direction
}
type OptionGraph<T> = DirectedGraph<undefined,T|undefined,IdAndDirection>;

const createVertex = <T>(node:OptionNode<T>,graph:OptionGraph<T>):VertexDescriptor|undefined=>{
    if(node instanceof Branch){
        const u = addVertex(undefined,graph);
        const {children}=node;
        children.forEach(child=>{
            const{id,direction} = child;
            const v = createVertex(child,graph);
            if(v){
            addEdge(u,v,{id,direction},graph);
            }
        })
        return u;
    }

    if(node instanceof Leaf){
        return addVertex(node.value,graph);
    }
    
    return undefined;
}

const toGraph = <T>(node:OptionNode<T>):OptionGraph<T>=>{
    const graph =  new DirectedGraph<undefined,T|undefined,IdAndDirection>(undefined);
    createVertex(node,graph);
    return graph;
}

class OptionWriter<T> implements DotWriter<undefined,T|undefined,IdAndDirection>{
    constructor(private readonly graph:OptionGraph<T>){}
    writeGraph(): string {
        return "";
    }
    writeVertex(v: VertexDescriptor): string {
        const node = this.graph.getVertexData(v);
        if(node){
            return `[label="${node}"]`;
        }
        return `[label=""]`;
    }
    writeEdge(e: EdgeDescriptor): string {
        const edge = this.graph.getEdgeData(e);
        if(edge){
            const {id,direction} = edge;
            if(id!==undefined && direction){
                return `[label="${id}-${direction}"]`
            }
        }
        return "";
    }

}

describe("tests", () => {
  describe("getSplits", () => {
    test("empty", () => {
      const result = getSplits([]);
      expect(result).toHaveLength(0);
    });
    test("1 element", () => {
      const result = getSplits([1]);
      expect(result).toHaveLength(0);
      expect(result).toStrictEqual([]);
    });
    test("2 elements", () => {
      const result = getSplits([1, 2]);
      expect(result).toHaveLength(1);
      expect(result).toStrictEqual([[[1], [2]]]);
    });
    test("3 elements", () => {
      const result = getSplits([1, 2, 3]);
      expect(result).toHaveLength(2);
      expect(result).toStrictEqual([
        [[1], [2, 3]],
        [[1, 2], [3]],
      ]);
    });
    test("4 elements", () => {
      const result = getSplits([1, 2, 3, 4]);
      expect(result).toHaveLength(3);
      expect(result).toStrictEqual([
        [[1], [2, 3, 4]],
        [
          [1, 2],
          [3, 4],
        ],
        [[1, 2, 3], [4]],
      ]);
    });
  });
  describe("createTree", () => {
    test("0 elements", () => {
      const result = createTree([]);
      expect(result).toBeInstanceOf(NullNode);
    });
    test("1 elements", () => {
      const result = createTree([1]);
      expect(result).toBeInstanceOf(Leaf);
      console.log(result);
    });
    test("2 elements", () => {
      const result = createTree([1, 2]);
      expect(result).toBeInstanceOf(Branch);
      console.log(result);
    });
    test("n elements", () => {
      const result = createTree([1, 2, 3,4,5,6]);
      expect(result).toBeInstanceOf(Branch);
      //const jsonStr = JSON.stringify(result, null, 2);
      //console.log(jsonStr);

      const graph = toGraph(result);
      const out = toDot(graph,new OptionWriter(graph));
      console.log(out);
    });
  });
});
