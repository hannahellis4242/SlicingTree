import { DirectedGraph } from "graphts";
import OptionNode from "./OptionNode";

type OptionGraph<T> = DirectedGraph<undefined,T|undefined,OptionNode>;
export default OptionGraph;