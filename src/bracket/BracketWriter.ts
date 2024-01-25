import Graph, { VertexDescriptor, EdgeDescriptor } from "graphts";
import { DotWriter } from "../toDot";
import BracketGraph, { Direction } from "./BracketGraph";

export default class BracketWriter<T> implements DotWriter<undefined, T | undefined, Direction>{
    constructor(private readonly graph:BracketGraph<T>){}
    writeGraph(g: Graph<undefined, T | undefined, Direction>): string {
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