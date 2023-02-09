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
        const callBacks = this.event[eventName] || [];
        callBacks.push(fun);
        this.event[eventName] = callBacks;
    }
    emit(eventName, ...args) {
        const callBacks = this.event[eventName] || [];
        callBacks.forEach((cb) => {
            cb(...args);
        })
    }
    off(eventName, fun) {
        const callBacks = this.event[eventName] || [];
        callBacks = callBacks.filter((cb) => cb !== fun && cb.init !== fun)
        this.event[eventName] = callBacks;
    }
    once(eventName, fun) {
        const one = (...args) => {
            fun(...args);
            this.off(eventName, fun)
        }
        one.init = fun;
        this.on(eventName, one);
    }
}