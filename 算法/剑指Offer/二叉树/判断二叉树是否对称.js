function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function isSymmetrical(pRoot) {
    // write code here
    const isSame = (node1, node2) => {
        if (!node1 && !node2) {
            return true
        }
        if (!node1 || !node2 || node1.val !== node2.val) {
            return false
        }
        return isSame(node1.left, node2.right) && isSame(node1.right, node2.left)
    }
    return isSame(pRoot, pRoot)
}