/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-08 11:51:25
 * @LastEdiTime: 
 */
// 防抖
let deb = function (fn, delay, imme) {
    let timer = null
    return function (...args) {
        clearTimeout(timer)
        if (imme && !timer) {
            timer = setTimeout(() => {
                timer = null
            }, delay)
            fn.apply(this.args)
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}
// 节流
let thr = function (fn, delay) {
    let timer = null
    return function (...args) {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay);
    }
}