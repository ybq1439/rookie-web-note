function ListNode(x) {
    this.val = x;
    this.next = null;
}

function EntryNodeOfLoop(pHead) {
    // write code here
    let p = pHead
    while (p) {
        if (p.flag) {
            return p
        } else {
            p.flag = true
            p = p.next
        }
    }
    return null
}