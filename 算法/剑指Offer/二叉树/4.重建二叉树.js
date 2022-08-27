/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-07 15:55:51
 * @LastEdiTime: 
 */
function TreeNode(val = 0) {
    this.val = val
    this.left = null
    this.right = null
}

function reConstructBinaryTree(pre, vin) {
    // write code here
    if (pre.length === 0 || vin.length === 0) {
        // 这里一定需要返回值，因为没有子树也要返回 null
        return null
    }
    let rootValue = pre[0]
    let rootNode = new TreeNode(rootValue)
    let leftIndex = vin.indexOf(rootValue)//这里更多的是强调左子树的长度
    // 找到所有的 左子树
    rootNode.left = reConstructBinaryTree(
        // 这里先序遍历 需要去掉第一个元素，也就是上层根元素
        pre.slice(1, leftIndex + 1),
        vin.slice(0, leftIndex)
    )
    rootNode.right = reConstructBinaryTree(
        pre.slice(leftIndex + 1),
        vin.slice(leftIndex + 1)
    )
    return rootNode
}