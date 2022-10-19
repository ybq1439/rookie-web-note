/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-10 11:37:07
 * @LastEdiTime: 
 */
// 三个指针
var reverseList = function (head) {
    let pre = null
    let curr = head
    while (curr !== null) {
        let next = curr.next
        curr.next = pre
        pre = curr
        curr = next
    }
    return pre
};
// 反转链表递归版本
const reverseList_ = (head) => {
    if (!head || !head.next) {
        return head
    }
    // 指针移到最末尾
    const newHead = reverseList_(head);
    head.next.next = head;
    head.next = null;
    return newHead
};