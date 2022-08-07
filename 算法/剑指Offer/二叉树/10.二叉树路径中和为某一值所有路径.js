/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-07 17:19:29
 * @LastEdiTime: 
 */
function TreeNode(val = 0) {
    this.val = val
    this.left = null
    this.right = null
}
//回溯法
function FindPath(root, expectNumber) {
    // write code here
    if (!root) {
        return []
    }
    const result = []
    const checkIfHas = (node, arr, sum) => {
        if (!node) {
            return
        }
        arr.push(node.val)
        if (!node.left && !node.right && sum === node.val) {
            result.push([...arr])
        }
        checkIfHas(node.left, arr, sum - node.val)
        checkIfHas(node.right, arr, sum - node.val)
        arr.pop()
    }
    checkIfHas(root, [], expectNumber)
    console.log(result)
}