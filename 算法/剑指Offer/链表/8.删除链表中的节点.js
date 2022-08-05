
function ListNode(x) {
    this.val = x;
    this.next = null;
}

function deleteNode(head, val) {
    // write code here
    let headNode = new ListNode
    headNode.next = head
    let cur = head
    let pre = headNode
    while (p) {
        if (p.val === val) {
            pre.next = p.next
            break
        } else {
            cur = cur.next
            pre = pre.next
        }
    }
    return headNode.next
}