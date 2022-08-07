/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-07 16:02:33
 * @LastEdiTime: 
 */
// 二叉树镜像，左右子树都交换
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function Mirror(pRoot) {
    if (!pRoot) {
        return null
    }
    // write code here
    const changeLeftNode = (node) => {
        if (!node) {
            return
        }
        let leftNode = node.left
        node.left = node.right
        node.right = leftNode
        changeLeftNode(node.left)
        changeLeftNode(node.right)
    }
    changeLeftNode(pRoot)
    return pRoot
}