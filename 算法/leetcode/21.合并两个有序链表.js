/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-03 17:21:50
 * @LastEdiTime: 
 */
function ListNode(val = 0, next = null) {
    this.val = val
    this.next = next
}
var mergeTwoLists = function (list1, list2) {
    let cur = new ListNode()
    cur.next = list1
    let head = cur
    while (list1 !== null && list2 !== null) {
        if (list1.val > list2.val) {
            cur.next = list2
            list2 = list2.next
        } else {
            cur.next = list1
            list1 = list1.next
        }
        cur = cur.next
    }
    if (list1 !== null) {
        cur.next = list1
    } else if (list2 !== null) {
        cur.next = list2
    }
    return head.next
};