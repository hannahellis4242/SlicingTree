import Graph, { VertexDescriptor, EdgeDescriptor, DotWriter } from "graphts";
import BracketGraph, { Direction } from "./BracketGraph";

export default class BracketWriter<T> implements DotWriter<undefined, T | undefined, Direction>{
    constructor(private readonly graph:BracketGraph<T>){}
    writeGraph(): string {
        return "";
    }
    writeVertex(v: VertexDescriptor): string {
        const value = this.graph.getVertexData(v);
        if(value){
            return `[label="${value}"]`;
        }
        return "[label=\"\"]";
    }
    writeEdge(e: EdgeDescriptor): string {
        const value = this.graph.getEdgeData(e);
        if(value){
            return `[label="${value}"]`;
        }
        return "";
    }
}