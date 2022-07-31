/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-01 11:11:14
 * @LastEdiTime: 
 */
/* 
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，
并且每个节点只能存储 一位 数字。
请你将两个数相加，并以相同形式返回一个表示和的链表。
你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
*/
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var addTwoNumbers = function (l1, l2) {
    let result = new ListNode()
    let current = result
    let carry = 0 //保存进位信息
    while (l1 != null || l2 != null) {
        let sum = 0
        if (l1 != null) {
            sum += l1.val
            l1 = l1.next
        }
        if (l2 != null) {
            sum += l2.val
            l2 = l2.next
        }
        sum += carry
        carry = Math.floor(sum / 10)
        // 特别注意这里是在 next 后添加一个节点
        current.next = new ListNode(sum % 10)
        current = current.next
    }
    if (carry > 0) {
        current.next = new ListNode(carry)
    }
    return result.next
};