/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-15 12:12:23
 * @LastEdiTime: 
 */
var detectCycle = function (head) {
    let p = head
    let sum = 0
    while (p.next) {
        if (p.pos) {
            return p
        } else {
            p.pos = sum
            sum++
            p = p.next
        }
    }
    return false
};