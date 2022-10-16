/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-09-28 22:54:00
 * @LastEdiTime: 
 */
class EventEmitter {
    constructor() {
        this._event = {} 
    }
    // 注册事件
    on(eventName, callBack) {
        const oldCallBacks = this._event[eventName] || [];
        oldCallBacks.push(callBack)
        this._event[eventName] = oldCallBacks;
    }
    // 触发事件
    emit(eventName, ...args) {
        const callBacks = this._event[eventName];
        callBacks.map((cb) => {
            cb(...args)
        })
    }
    // 解绑事件
    off(eventName, callBack) {
        const callBacks = this._event[eventName];
        const newCallBacks = callBacks.filter((cb) => cb !== callBack && cb.initialCallBack !== callBack);
        this._event[eventName] = newCallBacks;
    }
    // 事件单次订阅
    once(eventName, callBack) {
        const one = (...args) => {
            callBack(...args)
            this.off(eventName, one)
        };
        one.initialCallBack = callBack;
        this.on(eventName, one)
    }
}