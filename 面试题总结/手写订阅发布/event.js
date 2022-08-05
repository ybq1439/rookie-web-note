class EventEmitter {
    constructor() {
        this._event = {}
    }
    // 注册事件
    on(eventName, callBack) {
        const callBacks = this._event[eventName] || []
        callBacks.push(callBack)
        this._event[eventName] = callBacks
    }
    // 触发事件
    emit(eventName, ...args) {
        const callBacks = this._event[eventName] || []
        callBacks.forEach(cb => cb(...args));
    }
    // 解绑事件
    off(eventName, callBack) {
        const callBacks = this._event[eventName] || []
        const newCallBacks = callBacks.filter((cb) => cb !== callBack && cb.initialCallBack !== callBack)//取消 once 订阅
        this._event[eventName] = newCallBacks
    }
    // 事件单次订阅
    once(eventName, callBack) {
        // 由于需要在回调执行后，取消订阅事件，所以需要对传入的回调函数进行一次包装
        const one = (...args) => {
            // 执行回调函数
            callBack(...args)
            // 取消订阅改事件
            this.off(eventName, one)
        }
        one.initialCallBack = callBack
        this.on(eventName, one)
    }

}