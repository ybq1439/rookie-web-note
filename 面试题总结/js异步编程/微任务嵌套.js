/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2023-02-15 22:10:16
 * @LastEdiTime: 
 */
// 执行完成一个 then，会把下一个then 插入微任务队列。
console.log('start')

Promise.resolve()
    .then(() => {
        console.log('A1')
        Promise.resolve()
            .then(() => {
                console.log('A2-1')
            })
            .then(() => {
                console.log('A2-2')
            })
    })

Promise.resolve()
    .then(() => {
        console.log('B1-1')
        setTimeout(() => {
            console.log('B2')
        }, 0)
    })
    .then(() => {
        console.log('B1-2')
    })

setTimeout(() => {
    console.log('C1')
    Promise.resolve()
        .then(() => {
            console.log('C2')
        })
}, 0)

setTimeout(() => {
    console.log('D1')
    setTimeout(() => {
        console.log('D2')
    }, 0)
}, 0)

console.log('end')