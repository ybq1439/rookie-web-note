/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-07 16:55:15
 * @LastEdiTime: 
 */
function TreeNode(val = 0) {
    this.val = val
    this.left = null
    this.right = null
}
//根节点直到叶子节点
function hasPathSum(root, sum) {
    // write code here
    if (!root) {
        return false
    }
    const checkIfHas = (node, sum) => {
        if (!node) {
            return false
        }
        // 需要判断是否是叶子节点 注意这里是 sum === node.val
        if (!node.left && !node.right && sum === node.val) {
            return true
        }
        return checkIfHas(node.left, sum - node.val) || checkIfHas(node.right, sum - node.val)
    }
    return checkIfHas(root, sum)
}