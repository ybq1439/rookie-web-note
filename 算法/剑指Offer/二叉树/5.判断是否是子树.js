/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-07 15:55:51
 * @LastEdiTime: 
 */
function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}

function HasSubtree(pRoot1, pRoot2) {
    // write code here
    if (!pRoot1 || !pRoot2) {
        return false
    }
    // 这个函数是去判断 两棵树是否相等
    const checkIfSame = (node1, node2) => {
        // 如果右子树遍历完成，则说明两颗子树完全一样
        if (!node2) {
            return true
        } else if (!node1) {
            // 如果左子树先遍历完成了，则说明 proot1 比 proot2 还要短
            return false
        } else if (node1.val !== node2.val) {
            return false
        }
        // 递归检验左右子树,左右子树都必须要相等
        return checkIfSame(node1.left, node2.left) && checkIfSame(node1.right, node2.right)
    }
    return checkIfSame(pRoot1, pRoot2) || HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2)
}