import { DirectedGraph, VertexDescriptor, addEdge, addVertex } from "graphts";
import BlockOption from "./BlockOption";
import Node from "./Node";
import { allSlices } from "./SliceOption";
import SlicingTreeOptionGraph from "./SlicingTreeOptionGraph";

const addChildren = (parent:VertexDescriptor,graph:SlicingTreeOptionGraph)=>{
    const node = graph.getVertexData(parent);
    if(!node){
      return;
    }
    const {block,slice,remaining} = node;
    if(slice){
      remaining.forEach((block)=>{
        const childRemaining = remaining.filter(x=>x!==block);
        const node:Node = {block,remaining:childRemaining}
        const vertex = addVertex(node,graph);
        addEdge(parent,vertex,null,graph);
        addChildren(vertex,graph);
      })
    }
    if(block && remaining.length !==0 ){
      allSlices.forEach((slice)=>{
        const node:Node = {slice,remaining}
        const vertex = addVertex(node,graph);
        addEdge(parent,vertex,null,graph);
        addChildren(vertex,graph);
      })
    }
  }
  
  const createSlicingTreeOptionsGraph = (blocks:BlockOption[]):SlicingTreeOptionGraph=>{
      const graph =  new DirectedGraph<null,Node,null>(null);
      const root = addVertex({slice:"root",remaining:blocks},graph);
      addChildren(root,graph);
      return graph;
  }
export default createSlicingTreeOptionsGraph;  