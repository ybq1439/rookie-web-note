/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2023-02-25 19:22:15
 * @LastEdiTime: 
 */
// 1-拦截对象的方法，并且添加逻辑
// 2-读取操作捕捉器

const timeProxy = new Proxy(Date, {
    get: function (target, prop, receiver) {
        if (prop === "now") {
            return function () {
                return new Date().getTime();
            }
        }
        return Reflect.get(target, prop, receiver);
    }
});
console.log(timeProxy.now()); // 输出当前时间的毫秒数

const obj = {
    add: function (x, y) {
        return x + y;
    }
};

const objProxy = new Proxy(obj, {
    get: function (target, prop, receiver) {
        const origMethod = target[prop];
        if (typeof origMethod === "function") {
            return function (...args) {
                console.log(`Calling ${prop}(${args.join(", ")})...`);
                return origMethod.apply(this, args);
            };
        } else {
            return origMethod;
        }
    }
});

console.log(objProxy.add(2, 3)); // 输出 "Calling add(2, 3)..." 和 5