/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-11-13 22:44:00
 * @LastEdiTime: 
 */
const deb = function (fun, delay) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fun.apply(this, args)
        }, delay)
    }
}
const thro = function (fun, delay) {
    let timer = null;
    return function (...args) {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fun.apply(this, args)
            timer = null;
        }, delay)
    }
}