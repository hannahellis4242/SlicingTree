import SlicingTreeNode from "./SlicingTreeNode";

export default class VerticalSlice implements SlicingTreeNode {
  constructor(
    public readonly lower: SlicingTreeNode,
    public readonly upper: SlicingTreeNode
  ) {}
}
