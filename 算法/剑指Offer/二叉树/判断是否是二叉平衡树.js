function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function IsBalanced_Solution(pRoot) {
    // write code here
    if (!pRoot) {
        return true
    }
    const getDeep = (node) => {
        if (!node) {
            return 0
        }
        return Math.max(getDeep(node.left) + 1, getDeep(node.right) + 1)
    }
    return (Math.abs(getDeep(pRoot.left) - getDeep(pRoot.right)) <= 1
        && IsBalanced_Solution(pRoot.left)
        && IsBalanced_Solution(pRoot.right))
}