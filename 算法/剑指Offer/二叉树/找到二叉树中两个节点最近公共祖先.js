function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}


function lowestCommonAncestor(root, o1, o2) {
    // write code here
    const find = (node, value1, value2) => {
        if (!node) {
            return null
        }
        if (node.val === value1 || node.val === value2) {
            return node.val
        }
        let left = find(node.left, value1, value2)
        let right = find(node.right, value1, value2)
        if (!left) {
            return right
        }
        if (!right) {
            return left
        }
        // 如果 left right 都不为空，那么说明公共父节点位于 node 上面
        return node
    }
    return find(root, o1, o2)
}