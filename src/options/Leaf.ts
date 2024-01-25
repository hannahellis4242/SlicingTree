import Direction from "./Direction";
import OptionNode from "./OptionNode";

export default class Leaf<T> implements OptionNode {
    constructor(
      public readonly value: T,
      public readonly id?: number,
      public readonly direction?: Direction
    ) {}
  }