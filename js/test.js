/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-26 14:59:43
 * @LastEdiTime: 
 */
function fun(a, b = 1) {
    console.log('hello')
    this.name = 'ybq';
}
console.log(fun.length)