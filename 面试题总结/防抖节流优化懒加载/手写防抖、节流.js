/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-07-08 11:51:25
 * @LastEdiTime: 
 */
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

const deb_ = (fn, delay) => {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay)
    }
}

const thro = (fn, delay) => {
    let timer = null;
    return function (...args) {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay)
    }
}