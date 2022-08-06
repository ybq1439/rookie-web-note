class Notifier {
    constructor() {
        this.observerList = []
    }
    // 增加 观察者
    add(obj) {
        this.observerList.push(obj)
    }
    // 删除 观察者
    remove(obj) {
        const index = this.observerList.findIndex((observer) => obj === observer)
        if (index > 0) {
            this.observerList.splice(index, 1)
        }
    }
    // 通知观察者
    notify() {
        this.observerList.forEach((observer) => {
            observer.update()
        })
    }
}
class Observer {
    constructor(cb) {
        if (typeof cb !== 'function') {
            throw new Error('请传入回调函数')
        } else {
            this.callBack = cb
        }
    }
    update() {
        this.callBack()
    }
}

const sayHi = () => {
    console.log('hi!how are you?')
}
const observer_first = new Observer(sayHi)
const observer_second = new Observer(sayHi)
const notifier_first = new Notifier()
notifier_first.add(observer_first)
notifier_first.add(observer_second)
notifier_first.notify()
notifier_first.remove(observer_second)
notifier_first.notify()