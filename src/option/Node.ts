import BlockOption from "./BlockOption";
import SliceOption from "./SliceOption";

export default interface Node{
    block?:BlockOption,
    slice?:SliceOption,
    remaining:BlockOption[];
  }