/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-10-16 15:14:10
 * @LastEdiTime: 
 */
let promise1 = Promise.resolve(1);
let p2 = [];
// 结果打印 [1,[]]
Promise.all([promise1, p2])
    .then((result) => {
        console.log('then:', result)
    }).catch((err) => {
        console.log('error', err)
    });