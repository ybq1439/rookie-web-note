/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-11-13 19:32:58
 * @LastEdiTime: 
 */
class Event {
    constructor() {
        this.event = {

        };
    }
    on(eventName, fun) {
        const oldCallBacks = this.event[eventName] || [];
        oldCallBacks.push(fun);
        this.event[eventName] = oldCallBacks;
    }
    emit(eventName, ...args) {
        const callBacks = this.event[eventName];
        callBacks.map((cb) => {
            cb(...args)
        })
    }
    off(eventName, fun) {
        const oldCallBacks = this.event[eventName] || [];
        oldCallBacks.filter((item) => item !== fun && item.once !== fun);
        this.event[eventName] = oldCallBacks;
    }
    once(eventName, fun) {
        const onceFun = (...args) => {
            fun(...args);
            this.off(eventName, fun)
        }
        onceFun.once = fun;
        this.on(eventName, onceFun)
    }
}