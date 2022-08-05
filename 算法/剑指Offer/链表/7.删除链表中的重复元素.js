function ListNode(x) {
    this.val = x;
    this.next = null;
}
function deleteDuplication(pHead) {
    // write code here
    let headNode = new ListNode()
    headNode.next = pHead
    let pre = headNode
    let cur = pHead
    while (cur) {
        // 如果存在重复元素，一直到不是重复元素
        if (cur.next && cur.next.val == cur.val) {
            while (cur.next && cur.next.val == cur.val) {
                cur = cur.next
            }
            cur = cur.next
            pre.next = cur
            continue
        }
        pre = cur
        cur = cur.next
    }
    return headNode.next
}