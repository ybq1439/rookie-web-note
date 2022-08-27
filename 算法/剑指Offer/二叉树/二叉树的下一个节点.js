// next 为 子节点 指向 父节点
function TreeLinkNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}
// 找出给节点的 中序遍历的 下一个节点
function GetNext(pNode) {
    // write code here
    let rootNode = pNode;
    while (rootNode.next) {
        // 找到根节点
        rootNode = rootNode.next;
    }
    const searchList = [];
    const search = (node) => {
        if (!node) {
            return;
        }
        search(node.left);
        searchList.push(node);
        search(node.right);
    };
    // 这里需要注意，使用根节点 去获取它的中序遍历结果
    search(rootNode);
    const index = searchList.indexOf(pNode) + 1;
    return searchList[index];
} 