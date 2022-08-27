function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function lowestCommonAncestor(root, p, q) {
    // write code here
    let max = Math.max(p, q)
    let min = Math.min(p, q)
    const search = (node) => {
        if (!node) {
            return null
        }
        // 根节点就是 p,q 中一个 或者分别位于根节点两侧
        if (node.val === max || node.val === min ||
            (node.val > min && node.val < max)) {
            return node.val
        }
        // 都位于根节点 左侧
        if (node.val > max) {
            return search(node.left)
        }
        // 都位于根节点右侧
        if (node.val < min) {
            return search(node.right)
        }
    }
    return search(root)
}