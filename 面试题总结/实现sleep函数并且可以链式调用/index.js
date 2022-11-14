/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2022-11-14 13:52:26
 * @LastEdiTime: 
 */
// 1) 调用方式
// new People().sleep(3).say('apple').sleep(5).say('durian');

// 2) 打印结果
// 'hello, whr' -(等待3s)--> 'whr eat apple' -(等待5s)--> 'whr eat durian'

// 3) 以下是代码实现
class People {
    constructor() {
        // 用一个 Promise 来实现
        this.queue = Promise.resolve();
    }
    sleep(time) {
        this.queue = this.queue
            .then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, time * 1000)
                })
            })
        return this;
    }
    say(value) {
        this.queue = this.queue.then(() => {
            console.log(`say-${value}`);
        })
        return this;
    }
    say2(value) {
        this.queue = this.queue.then(() => {
            console.log(`say2-${value}`)
        })
        return this;
    }
}
new People().sleep(3).say('hello').sleep(2).say2('world');