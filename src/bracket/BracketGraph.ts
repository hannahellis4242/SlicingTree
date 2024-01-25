import { DirectedGraph } from "graphts";

export type Direction = "left" | "right";
type BracketGraph<T> = DirectedGraph<undefined, T | undefined, Direction>;

export default BracketGraph;