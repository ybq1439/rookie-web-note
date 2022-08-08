
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
// 注意 result 作用域
let result = 0
function FindPath(root, sum) {
    // write code here
    if (!root) {
        return 0
    }
    const search = (node, num) => {
        if (!node) {
            return
        }
        if (node.val === num) {
            result++
        }
        search(node.left, num - node.val)
        search(node.right, num - node.val)
    }
    search(root, sum)
    // 注意 因为题目要求是所有的路径，不仅仅是需要到 叶子节点。所以需要再递归
    FindPath(root.left, sum)
    FindPath(root.right, sum)
    return result
}