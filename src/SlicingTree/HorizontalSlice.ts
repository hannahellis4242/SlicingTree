import SlicingTreeNode from "./SlicingTreeNode";

export default class HorizontalSlice implements SlicingTreeNode {
  constructor(
    public readonly left: SlicingTreeNode,
    public readonly right: SlicingTreeNode
  ) {}
}
