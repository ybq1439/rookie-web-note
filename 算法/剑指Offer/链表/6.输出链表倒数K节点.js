function ListNode(x) {
    this.val = x;
    this.next = null;
}

function FindKthToTail(pHead, k) {
    // write code here
    if (!pHead) {
        return null
    }
    let left = pHead
    let right = pHead
    for (let i = 0; i < k; i++) {
        if (!right) {
            return null
        }
        right = right.next;
    }
    while (right) {
        right = right.next;
        left = left.next;
    }
    return left
}