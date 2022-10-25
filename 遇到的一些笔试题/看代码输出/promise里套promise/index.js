/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-10-20 21:59:05
 * @LastEdiTime: 
 */
// 先输出 1，再输出 2
Promise.resolve().then(() => {
    return Promise.resolve().then(() => {
        console.log(1)
    })
}).then(() => {
    console.log(2)
})