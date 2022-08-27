// 入栈
let stack1 = []
// 出栈
let stack2 = []
function push(node) {
    // write code here
    stack1.push(node)
}
function pop() {
    // write code here
    // pop 的时候，把 入栈中的元素都压入 出栈 然后 pop 栈顶元素
    if (stack2.length === 0) {
        while (stack1.length > 0) {
            stack2.push(stack1.pop())
        }
    }
    return stack2.pop()
}