/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-09-28 23:08:58
 * @LastEdiTime: 
 */
class Observer {
    constructor(callBack) {
        if (typeof cb !== 'function') {
            throw new Error('请传入回调函数')
        }
        this.callBack = callBack;
    }
    update() {
        this.callBack()
    }
}
class Notifier {
    constructor() {
        this.observesList = [];
    }
    add(observer) {
        this.observesList.push(observer)
    }
    remove(observer) {
        this.observesList.filter((item) => item !== observer)
    }
    notify() {
        this.observesList.map((observer) => {
            observer.update()
        })
    }
}