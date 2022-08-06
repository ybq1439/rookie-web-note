function TreeNode(val = 0) {
    this.val = val
    this.left = null
    this.right = null
}
// 给定一棵结点数为n 二叉搜索树，请找出其中的第 k 小的TreeNode结点值。
// 因为 搜索二叉树 是 左子树一定小于右子树，所以可以使用 中序遍历，得到的序列就是生序的
function KthNode(proot, k) {
    // write code here
    if (k <= 0) {
        return -1
    }

    let valueList = []
    const search = (node) => {
        if (!node) {
            return
        }
        search(node.left)
        valueList.push(node.val)
        search(node.right)
    }
    search(proot)
    // 需要注意判断 k 是否超过了 整个二叉树长度
    if (k > valueList.length) {
        return -1
    }
    return valueList[k - 1]
}