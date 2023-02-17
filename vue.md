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

#### 为什么一定要使用`proxy`的方式取代`object.defineProperty`方法？

有几个难以解决的问题：

1. 对象属性和数组下标的变化必须通过 `Vue.set()` 和 `Vue.delete()` 这两个特殊的方法来进行，而不能直接修改对象属性或数组下标的值。
2. 在处理**对象嵌套**的情况下，vue2中需要我们**手动的去递归实现每个属性的响应式**。而vue3中由于采用`proxy`的方式，我们不需要手动的去实现，直接调用`reactive`函数就好了。`ref()`用于实现值的响应式。
3. 同时`proxy`能够有更多的拦截操作，更全面、灵活。

### 	2-vue3 中使用组合式 API 替代了 vue2 中的选项式 API；

#### 什么是组合式API？

组合式 API（Composition API）是 Vue 3 中引入的一组 API，用于更灵活地组织和重用组件逻辑。与 Vue 2.x 中通过选项的方式（如 `data`、`computed`、`methods` 等）来定义组件逻辑不同，组合式 API 通过**一组基础函数**（如 `ref`、`reactive`、`computed`、`watch` 等）以及 **`setup` 函数的方式，**提供了更加灵活、可重用、易于维护的组件逻辑组织方式。

#### 	Vue3中为什么要使用组合式API？

1. 更好的去组织代码：使用组合式API我们可以把相关的代码组织在一起，并且可以把逻辑拆分成更小的功能块；
2. 更好的逻辑复用；主要原因就是**数据与行为分离**。

#### 	Vue2中使用（mixins）混入进行逻辑复用的缺点：

1. 依赖的隐式传递问题，当我们一个组件使用到多个混入的时候，无法区分变量的来源；
2. 命名冲突问题：多个混的生命周期可以融合在一起执行，但是同名的属性、方法无法融合，导致冲突或者覆盖；
3. 耦合度高，难以维护：混入的行为会直接影响组件的行为，这使得组件和混入之间存在紧密的耦合度。当组件中使用多个混入时，这种耦合度会变得更加复杂和难以维护。

### 	3-生命周期不同：

#### 	beforeCreate\created 钩子变成 setup; 

1. 为什么要采用setUp这种形式？

   1. 使用 `setUp` 函数可以避免在**组件实例化和更新时重新创建响应式数据对象**，从而减少了组件实例的创建数量，**提高了渲染性能**。在 Vue 2 中，每当一个组件被实例化时，就会创建一个响应式数据对象，这些响应式数据对象都会存放在组件实例中。在组件更新时，会**重新创建一个新的响应式数据对象**，从而**导致了不必要的性能开销**。

      Vue 3 的 `setUp` 函数提供了一种新的组件创建方式，它使用了 **`proxy`** 来**代理组件的属性访问**，从而**避免了在组件更新时重新创建响应式数据对象的问题。**具体来说，每当一个组件更新时，**Vue 3 会对已有的 `proxy` 对象进行更新，而不是重新创建一个新的对象**，这样就可以避免不必要的性能开销。

2. 执行时机有什么不同？
   1. `beforeCreate`是在组件**实例化之后**，**初始化之前**被调用，此时组件的数据、计算属性、方法、watcher、事件等都没有被初始化。

   2. `created`则是在组件创建之后被调用，此时组件的数据已经被初始化，计算属性、方法、watcher等也已经准备就绪，但是**真正的DOM元素还没有被渲染**出来。

   3. `setup` 函数是在组件实例创建之前执行的，它可以访问组件的 props 和 context 对象，并且可以返回一个对象，该对象包含了模板中**需要用到的响应式数据和方法。**

      1. context对象是什么？`setUp` 函数的第一个参数为 `context`，是一个包含了组件实例所需属性和方法的对象。它是一个预设的组件上下文对象，包含了以下属性：

      - `attrs`：组件接收的非 prop 特性的对象，对应 Vue 2 的 `$attrs`。
      - `slots`：插槽内容的对象，对应 Vue 2 的 `$slots`。
      - `emit`：用于触发事件的函数，对应 Vue 2 的 `$emit`。
      - `expose`：用于暴露组件的方法或属性，让父组件可以访问，对应 Vue 2 的 `$parent`

3. 可以使得组件逻辑进行拆分，把关注点分离。也就是数据行为分离，**使得代码结构更加清晰，易于维护**，**也可以使得组件逻辑的复用性更好。**

   1. 关注点分离指什么？也就是**数据和行为分离**，具体来说，vue2中，我们的数据与行为，都是写在同一个响应式对象中，例如分别两个选项：data，method。这种方式会使得组件难以维护。而vue3中，数据，行为都通过不同函数实现，实现分离。

      ```vue
      <template>
        <div>
          <p>{{ message }}</p>
          <button @click="reverseMessage">Reverse Message</button>
        </div>
      </template>
      
      <script>
      import { ref, computed } from 'vue'
      
      export default {
        name: 'Example',
        setup() {
          // 使用 ref 定义响应式数据
          const message = ref('Hello, World!')
      
          // 使用 computed 计算属性定义行为
          const reversedMessage = computed(() => message.value.split('').reverse().join(''))
      
          const reverseMessage = () => {
            // 修改响应式数据 行为
            message.value = reversedMessage.value
          }
      
          // 返回模板中需要的数据和行为
          return {
            message,
            reverseMessage
          }
        }
      }
      </script>
      
      ```

      

#### beforeMount,mounted,beforeUpdate,updated为什么要改为前面加个on？

​	这样做可以避免与`beforeMount`类似，库中存在同名冲突。

#### beforeDestroy，destroyed === 》onBeforeUnmount，onUnmounted

##### 有什么区别？

1-Vue 2.x 的 `beforeDestroy` 和 `destroyed` 钩子是在**组件销毁前后调用的**，而 Vue 3.x 的 `onBeforeUnmount` 和 `onUnmounted` 钩子是在**组件卸载前后调用的**。在 Vue 3.x 中，组件卸载不一定会导致组件销毁，因为有可能组件会被缓存起来以便下次使用。因此，在 Vue 3.x 中，`onBeforeUnmount` 钩子是在**组件即将从页面中移除前调用**，`onUnmounted` 钩子是在**组件已经从页面中移除后调用**。

2-vue3中缓存组件的时候，组件被缓存之前会触发 `beforeUnmount` 和 `unmounted` 钩子函数，但在组件被重新使用时，不会再触发这两个钩子函数。

3-但是在 Vue 2.x 中，被缓存的组件**在被销毁时**，**仍然会触发 `beforeDestroy` 和 `destroyed` 钩子函数**。

### 	4-vue3 更好支持 TS;

#### 	为什么会更好的支持TS？

1. Vue 3 的函数式 API 是基于 TypeScript 设计的，这意味着我们可以为组件的 props、data、computed 和 methods 等属性添加正确的类型注解；
2. Vue2中没有基于TS设计，那时候还没有流行，如果需要使用TS，要安装插件，而且不是那么完善；

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

