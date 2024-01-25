import Direction from "./Direction";
import OptionNode from "./OptionNode";

export default class Branch<T> implements OptionNode{
    constructor(
      public readonly children: OptionNode[],
      public readonly id?: number,
      public readonly direction?: Direction,
    ) {}
  }