import HorizontalSlice from "./HorizontalSlice";
import Leaf from "./Leaf";
import SlicingTreeNode from "./SlicingTreeNode";
import VerticalSlice from "./VerticalSlice";

const postOrder = (node:SlicingTreeNode):SlicingTreeNode[]=>{
    if(node instanceof Leaf){
        return [node];
    }
    if(node instanceof HorizontalSlice){
        return [...postOrder(node.left),...postOrder(node.right),node];
    }
    if(node instanceof VerticalSlice){
        return [...postOrder(node.lower),...postOrder(node.upper),node];
    }
return [];
}
export default postOrder;