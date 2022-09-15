/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-09-15 23:08:05
 * @LastEdiTime: 
 */
setTimeout(() => {
    console.log(2)
}, 0)

new Promise((resolve) => {
    console.log('===')
    setTimeout(() => {
        console.log(3)
        resolve(4)
    }, 0);
}).then((res) => {
    console.log(res)
})

console.log(1)