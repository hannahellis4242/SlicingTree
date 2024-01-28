import { VertexDescriptor, EdgeDescriptor } from "graphts";
import OptionGraph from "./OptionGraph";
import OptionNode from "./OptionNode";
import { DotWriter } from "graphts";

export default class OptionWriter<T>
  implements DotWriter<undefined, T | undefined, OptionNode>
{
  constructor(private readonly graph: OptionGraph<T>) {}
  writeGraph(): string {
    return "";
  }
  writeVertex(v: VertexDescriptor): string {
    const node = this.graph.getVertexData(v);
    if (node) {
      return `[label="${node}"]`;
    }
    return `[label=""]`;
  }
  writeEdge(e: EdgeDescriptor): string {
    const edge = this.graph.getEdgeData(e);
    if (edge) {
      const { id, direction } = edge;
      if (id !== undefined && direction) {
        return `[label="${id}-${direction}"]`;
      }
    }
    return "";
  }
}
