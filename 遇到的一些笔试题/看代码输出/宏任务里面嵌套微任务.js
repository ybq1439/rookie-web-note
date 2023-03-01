setTimeout(() => {
    console.log(1);
}, 0)

new Promise((resolve) => {
    console.log(2)
    // 先执行完成宏任务，才会通过resolve插入任务到微任务队列
    setTimeout(() => {
        console.log(3)
        resolve(4)
    }, 0)
}).then((result) => {
    console.log(result)
})
console.log(5)
// 2 5 1 3 4