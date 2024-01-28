import SlicingTreeNode from "./SlicingTreeNode";

export default class Leaf<T> implements SlicingTreeNode {
  constructor(public readonly value: T) {}
}
