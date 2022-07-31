function ListNode(val = 0, next = null) {
    this.val = val
    this.next = next
}

function printListFromTailToHead(head) {
    // write code here
    const result = []
    let p = head
    while (p) {
        result.unshift(p.val)
        p = p.next
    }
    return result
}