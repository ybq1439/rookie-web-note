/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-08-07 16:32:06
 * @LastEdiTime: 
 */
// 给定一个数组，判断这个数组是否是 一个二叉搜索树的 后续遍历序列   
function TreeNode(val = 0) {
    this.val = val
    this.left = null
    this.right = null
}
// 通过找到 根元素，然后依据 左右子树 分别比根元素小 和 大的特性，计算出 长度，比较长度
function VerifySquenceOfBST(sequence) {
    // write code here
    // 需要额外判断 是否是 空数组
    if (sequence.length === 0) {
        return false
    }
    const check = (searchArr) => {
        // 注意返回 true 出口
        if (searchArr.length === 0) {
            return true
        }
        let rootValue = searchArr[searchArr.length - 1]
        let index = 0
        while (searchArr[index] < rootValue) {
            index++
        }
        let leftIndex = index
        while (searchArr[index] > rootValue) {
            index++
        }
        if (index === searchArr.length - 1) {
            let left = searchArr.slice(0, leftIndex)
            let right = searchArr.slice(leftIndex, searchArr.length - 1)
            return check(left) && check(right)
        } else {
            return false
        }
    }
    return check(sequence)
}