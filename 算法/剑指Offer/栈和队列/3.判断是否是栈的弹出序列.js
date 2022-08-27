// 第一个参数是压入序列，第二个参数是需要判断弹出序列
// 思路：使用一个辅助栈，用于模拟压入 弹出过程，如果最后这个辅助栈还存在元素，那么肯定就不是一个弹出序列 
function IsPopOrder(pushV, popV) {
    // write code here
    let helper = []
    for (let i = 0; i < pushV.length; i++) {
        helper.push(pushV[i])
        while (helper.length > 0 && helper[helper.length - 1] === popV[0]) {
            helper.pop()
            popV.shift()
        }
    }
    if (helper.length > 0) {
        return false
    }
    return true
}