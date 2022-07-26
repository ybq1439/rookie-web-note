/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-17 17:35:02
 * @LastEdiTime: 
 */
// 开两个指针，它们都需要把 A、B 都去走一遍，其中碰到相同的节点，就是相交节点
var getIntersectionNode = function (headA, headB) {
    let p1 = headA
    let p2 = headB
    // 如果不存在相交节点，那么最后 p1 p2 都会指向 null，也就会退出循环
    while (p1 !== p2) {
        if (p1) {
            p1 = p1.next
        } else {
            p1 = headB
        }
        if (p2) {
            p2 = p2.next
        } else {
            p2 = headA
        }
    }
    return p1
};