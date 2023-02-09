/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-09-28 23:08:58
 * @LastEdiTime: 
 */
class Notifier {
    constructor() {
        this.observerList = [];
    }
    add(observer) {
        this.observerList.push(observer);
    }
    remove(observer) {
        const index = this.observerList.findIndex((item) => item === observer);
        if (index > 0) {
            this.observerList.splice(index, 1);
        }
    }
    notify() {
        this.observerList.forEach((observer) => {
            observer.update();
        })
    }
}
class Observer {
    constructor(cb) {
        this.callBack = cb;
    }
    update() {
        this.callBack();
    }
}
const sayName = (name) => {
    console.log(`i am ${name}`);
}
const Noti = new Notifier();
const Ob1 = new Observer(() => sayName('ob1'));
const Ob2 = new Observer(() => sayName('ob2'));
const Ob3 = new Observer(() => sayName(`ob3`));
Noti.add(Ob1);
Noti.add(Ob2);
Noti.add(Ob3);
Noti.remove(Ob2);
Noti.notify()
