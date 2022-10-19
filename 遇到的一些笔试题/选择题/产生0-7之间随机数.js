/*
 * @Descripttion:
 * @version:
 * @Author: ybq
 * @Date: 2022-10-19 23:00:21
 * @LastEdiTime:
 */
// Math.random [0,1) 不包括 1
// Math.ceil() 向上取整
const result1 = Math.ceil(Math.random() * 7);
const arr = [];
for (let i = 0; i < 10; i++) {
    //这里得到的是[1,7)？为什么 因为从概率上来说得到 0 的概率是 0，不可能
    // 或者说需要非常的的次数才有概率得到0
    arr.push(Math.ceil(Math.random() * 7))
}
console.log(result1)
console.log(arr)

// 正确
const result2 = Math.floor(Math.random() * 8);
const result3 = Math.round(Math.random() * 7);