function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function PrintFromTopToBottom(root) {
    // write code here
    const res = {}
    let level = 0
    const search = (node, level) => {
        if (!node) {
            return
        }
        if (!res[level]) {
            res[level] = []
        }
        res[level].push(node.val)
        search(node.left, level + 1)
        search(node.right, level + 1)
    }
    search(root, level)
    const result = []
    for (const item in res) {
        result.push(...res[item]);
    }
    return result
}