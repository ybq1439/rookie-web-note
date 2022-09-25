## 1-.then(onFulfilled,onRejected) 与 catch

​	.then 函数是会 **接受两个参数的**，当 promise 被拒绝的时候，就会调用 onRejected 回调。至于 **catch 方法**，.catch 就等于 **.then(null||undefined,onRejected)**。

## 2-promise.all()：中接受的是一个可以 迭代的 对像，可以是 array,set,map,string