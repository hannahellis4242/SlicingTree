import Graph, { VertexDescriptor, inEdges, outDegree, source, target, vertices } from "graphts";

const root=<G,V,E>(g:Graph<G,V,E>,v?:VertexDescriptor):VertexDescriptor|undefined=>{
    if(!v){
      const [v] = vertices(g);
      if(!v){
        return undefined;
      }
      return root(g,v);
    }
    if(outDegree(v,g) === 0){
      return v;
    }
    const parents=inEdges(v,g)
      .flatMap(edge=>[source(edge,g),target(edge,g)])
      .filter((vertex)=>vertex !== undefined)
      .map(vertex=>vertex!)
      .filter((vertex)=>vertex !== v);
    if(parents.length!==1)
    {
      return undefined;
    }
    return root(g,parents[0]);
  }
  export default root;