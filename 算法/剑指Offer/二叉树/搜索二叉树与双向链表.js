function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function Convert(pRootOfTree) {
    // write code here
    // pre 为前面的指针
    // head 为后面指针，指向根节点
    let pre = null
    let head = null
    const search = (node) => {
        if (!node) {
            return
        }
        // 首先遍历到左子树
        search(node.left)
        // pre === null 则 此时的 node 为最左叶子节点 也就是返回链表的头节点
        // 只会出现一次
        if (!pre) {
            head = node
        } else {
            pre.right = node
        }
        node.left = pre
        pre = node
        search(node.right)
    }
    search(pRootOfTree)
    return head
}