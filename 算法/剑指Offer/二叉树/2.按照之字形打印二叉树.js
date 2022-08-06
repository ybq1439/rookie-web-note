function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function Print(pRoot) {
    // write code here
    let res = []
    let level = 0
    const search = (root, arr, level) => {
        if (!root) {
            return
        }
        if (!arr[level]) {
            arr[level] = []
        }
        arr[level].push(root.val)
        search(root.left, arr, level + 1)
        search(root.right, arr, level + 1)
    }
    search(pRoot, res, level)
    // 需要把偶数列 反转过来
    for (let i = 0; i < res.length; i++) {
        if (i % 2) {
            res[i].reverse()
        }
    }
    return res
}