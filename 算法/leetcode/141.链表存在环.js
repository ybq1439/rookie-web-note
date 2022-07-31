/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-15 11:59:55
 * @LastEdiTime: 
 */
var hasCycle = function (head) {
    if (!head) {
        return false
    }
    if (!head.next) {
        return false
    }
    let p = head
    while (p.next) {
        if (p.flag && p.flag === 1) {
            return true
        } else {
            p.flag = 1
        }
        p = p.next
    }
    return false
};
// 解法 2使用快慢指针
// 快指针每次走两步，满指针每次走一步
var hasCycle_ = function (head) {
    if (!head) {
        return false
    }
    if (!head.next) {
        return false
    }
    let left = head
    let right = head
    while (right.next && right.next.next) {
        right = right.next.next
        left = left.next
        if (right === left) {
            return true
        }
    }
    return false
};