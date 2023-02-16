## 1-vue 中双向绑定的原理？

​	发布订阅者模式--回调函数实现。

​	实现双向绑定主要三个部分：observer ---- watcher ---- compile。observer 过程中，对数据进行响应式处理，也就是进行数据劫持。compile 是去解析指令，将数据绑定到视图、以及相应的 更新数据的 更新函数绑定起来。watcher 就是连接 observer、complie 的桥梁。

​	数据影响视图：调用了数据对应的 setter，通过发布订阅者模式，发通知给 watcher，watcher 去更新视图；

​	视图影响数据：通过绑定的对应的回调函数实现。



​	vue 是基于 MVVM 模型的双向绑定框架，其中 M 指的 Modal，V 指的 View，VM 指的 是 ViewModal，而 Vue 就是这个模型中的 VM，主要就是负责两件事：1-数据改变，去更新视图；2-视图改变，去更新数据；

​	VM 有两个重要的组成部分：Observer（监视器）：对所有的数据进行监听、Compiler（解析器）：解析 Vue 指令，替换对应的数据，绑定相应的函数。

​	整个实现路程大概是这样：

​		1-初始化 Vue 实例，对 data 进行响应式处理，这个过程由 Observer 实现；

​		2-同时进行模板的编译，找到动态绑定的数据，初始化视图；

​		3-同时会定义 更新视图函数以及 **watcher** 观察者，将来数据发生改变 watcher 可以通过更新函数 更新视图；

​		4-对应的视图在 complier 帮助下 订阅数据变化，绑定对应的更新函数；

​		5-数据发生改变，Observer 发出通知，Watcher 接收到通知，调用对应更新函数，更新视图；

## 2-vue2 和 vue3 的区别？

### 	1-响应式原理不同；

### 	2-vue3 中使用组合式 API 替代了 vue2 中的选项式 API，实现逻辑的模块化和复用；

​		优点：

​		提高复用性，代码直接引入就可以用，而不是需要像 vue2 中去写混入；

​		后期维护更加容易，不需要找来找去，一个业务相关的代码可以写到一块；

### 	3-生命周期不同：

​		beforeCreate\created 钩子变成 setup; mount、 update 相关的在前面加 on ; destory 变成 OnUnMount；

### 	4-vue3 更好支持 TS;

### 	5-vue3 对 diff 算法进一步优化：

​		1-vue3 在生成 Vnode 的时候，给 **不会更新的静态的节点** 打上标记，区分出来，渲染的时候直接复用就可以，不需要递归的 diff 了；

​		2-使用 **最长子序列算法** 替代双端指针算法；

## 3-中央事件总线原理？

​	在 **VM Vue 实例** 的 beforeCreate 生命周期中设置，利用的是 发布订阅者模式，	vue.on、vue.off、vue.emit

```javascript
  beforeCreate() {
    // 中央事件总线的安装
    console.log('我是谁',this)//this 就是 VM vue实例
    Vue.prototype.$bus = this
  }
```

## 4-vuex 的实现原理？

Vuex是一个专为Vue服务，用于管理页面数据状态、提供统一数据操作的生态系统。规定所有的数据操作必须通过 `action - mutation - state change` 的流程来进行。