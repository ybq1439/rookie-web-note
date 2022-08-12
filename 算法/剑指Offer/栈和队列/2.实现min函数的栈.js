let stack = []
// 辅助栈 高度与 stack 一样，栈顶总是最小值
let minStack = []
function push(node) {
    // write code here
    if (minStack.length === 0) {
        minStack.push(node)
    } else {
        if (node < minStack[minStack.length - 1]) {
            minStack.push(node)
        } else {
            minStack.push(minStack[minStack.length - 1])
        }
    }
    stack.push(node)
}
// 弹出栈顶元素
function pop() {
    // write code here
    if (stack.length === 0) {
        return null
    }
    minStack.pop()
    return stack.pop()
}
// 获取栈顶元素
function top() {
    // write code here
    if (stack.length === 0) {
        return null
    }
    return stack[stack.length - 1]
}
function min() {
    // write code here
    if (minStack.length === 0) {
        return null
    }
    return minStack[minStack.length - 1]
}