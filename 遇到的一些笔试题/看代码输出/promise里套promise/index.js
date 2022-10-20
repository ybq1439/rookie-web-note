/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-10-20 21:59:05
 * @LastEdiTime: 
 */
Promise.resolve().then(() => {
    return Promise.resolve().then(() => {
        console.log(1)
    })
}).then(() => {
    console.log(2)
})