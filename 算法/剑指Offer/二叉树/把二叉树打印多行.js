function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function Print(pRoot) {
    // write code here
    const result = []
    const search = (node, level) => {
        if (!node) {
            return
        }
        if (!result[level]) {
            result[level] = []
        }
        result[level].push(node.val)
        search(node.left, level + 1)
        search(node.right, level + 1)
    }
    search(pRoot, 0)
    return result
}