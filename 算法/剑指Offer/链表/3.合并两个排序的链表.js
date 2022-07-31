function ListNode(x) {
    this.val = x;
    this.next = null;
}

function Merge(pHead1, pHead2) {
    // write code here
    let headListNode = new ListNode(0)
    let p1 = pHead1
    let p2 = pHead2
    let cur = headListNode
    while (p1 && p2) {
        if (p1.val <= p2.val) {
            cur.next = new ListNode(p1.val)
            p1 = p1.next
        } else {
            cur.next = new ListNode(p2.val)
            p2 = p2.next
        }
        cur = cur.next
    }
    if (p1) {
        cur.next = p1
    }
    if (p2) {
        cur.next = p2
    }
    return headListNode.next
}