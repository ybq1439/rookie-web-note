/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2023-02-09 22:25:27
 * @LastEdiTime: 
 */
// 1-注意的一点：await 这一行的代码也是会立即执行的，之后的代码会放到微任务队列
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function () {
    console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')