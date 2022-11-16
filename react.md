## 1-为什么 react 不推荐突变状态？

### （1）简化复杂功能：

​	不可变性使得复杂的特性更容易实现，比如 react 官网上“井字棋” 游戏的 **时间旅行功能**，其实也就是 **撤销恢复功能**，不直接去修改数据，可以使得我们 追溯到之前的历史记录。

### （2）跟踪数据的改变：

​	如果直接修改数据，那么很难跟踪到数据的改变。跟踪数据的变化需要 **可变对象** 于 **改变之前** 的版本对比，这样的话，整个对象树都需要遍历一次。

​	对于不可变数据而言，如果对象是一个新对象了，我们就认为对象发生改变了。

### （3）性能优化，确定在 react 中何时重新渲染：

​	不可变性最主要的优势在于它可以帮助我们在 React 中创建 *pure components*。我们可以很轻松的确定数据是否发生改变，从而确定何时对组件进行重新渲染。

## 2-setState 一直是异步的吗？

​	setState 更新数据的时候，分为同步更新和异步更新。

​	异步更新：在组件生命周期或者 react 合成事件中，setState 是异步更新；

​	同步更新：在 setTimerOut 或者 原生 DOM 事件中，setState 是同步更新；

​	setState 的异步其实不是指 **内部由异步代码构成**，本身执行过程和代码都是同步的，只是因为 **合成事件、钩子函数** 的执行顺序在数据更新之前，所以出现 **合成事件和钩子函数** 中无法立马获取到更新后的值。

## 3-setState 中的批量更新？

​	在 合成事件和生命周期钩子中，连续的调用 setState 只有最后一次会起作用。

## 4-说一说 hooks？

​	hook 是我们可以在 函数式组件中使用 类组件中的特性，例如 state。

### 	常用 hooks：

### 		（1）useState：在函数式组件中维护状态；

### 		（2）useEffect：副作用钩子，相当于是 **componentDidMount、componentDidUpdate、componentWillUnmount** 的组合；

#### 			2-1 仅仅传递第一个参数，函数的话，相当于是 componentDidMount、componentDidUpdate；

#### 			2-2 第二个参数，数组：依赖项，传递空数组则 **只有在 componentDidMount 执行**；

#### 			2-3 **清除 effect**：

##### 				组件卸载时需要清除 effect 创建的诸如订阅或计时器 ID 等资源，实现这种功能需要返回一个清除函数。

```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

#### 			2-4清除 `effect`函数触发条件：

​			（1）会在组件 `卸载前`执行；

​			（2）组件每一次重新渲染也会执行，保证 **执行下一次 effect 之前，上一个 effect 就已经清除**；

#### 			3-`effect`执行时机：

​			不等同于`componentDidMount`,`componentDidUpdate`，传给 `useEffect` 的函数会在浏览器完成布局与绘制**之后**，在一个延迟事件中被调用。

### （3）useLayoutEffect 钩子

​			有的`effect`不可以被延时执行，例如一个对用户可见的`DOM`变更，就需要在浏览器`下一次绘制`之前执行，否则用户会感觉到视觉不一致。它和 `useEffect` 的结构相同，区别只是调用时机不同。

**！！！** React 18 开始，当它是离散的用户输入（如点击）的结果时，或者当它是由 `flushSync` 包装的更新结果时，传递给 `useEffect` 的函数将在屏幕布局和绘制**之前**同步执行。这种行为便于事件系统或 `flushSync` 的调用者观察该效果的结果。

### （4）useRef：`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数；

#### 	使用场景1：命令的访问子组件：

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### 	使用场景2：`useRef`可以用来保存任何可变值。

#### 	特点：1-返回一个普通的对象，不过与我们自己去创建一个`{current:...}`对象不同，`useRef`每一次都会返回同一个`ref`对象。2-`ref.current`发生改变，不会引起组件的重新渲染。3-`ref`对象发生改变，`useRef`并不会通知我们，不过像在 `React绑定或者解绑的ref`的时候触发某些逻辑代码，可以通过`回调ref，useCallBack()`实现。

### 	（5）useMemo()：

​	返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 值。

​	记住，传入 `useMemo` 的函数会在渲染期间执行。

​	**你可以把 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证。**

### 	如何实现一个 hooks 自定义 hooks：

​		通过自定义 hooks，可以把组件逻辑提取出来，进行复用。hooks 就是一个函数。

```jsx
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

#### 		1-自定义 Hook 是一个函数，其名称以 “`use`” 开头，函数内部可以调用其他的 Hook。原因：使用 use 开头，表示这个函数是否对内部 hook 的调用，react 无法检查 这个 hook 是否违背了 `Hook 的规则`。

#### 		2-组件使用相同的 hook 不会共享 state。

## 5-state 和 props区别？

一个组件的显示形态可以由 状态 state 和 参数 props 决定。

#### setState：

​	**`setState()`** 将对组件 state 的更改 **排入队列**，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。setState 并不会立即去更新组件，它会一次性的去 **更新多个组件**，优点是 **性能更好，不需要频繁的调用 render 方法**。

​	推迟更新组件，也带来一个问题，我们无法立刻或者最新的数据，可以通过 setState 第二个参数实现，第二个参数是回调，会在 **数据更新、组件渲染之后** 调用，相当于 **componentDidUpdate 钩子**；

#### props：

​	基于组件化的思想，props 就是组件外部传入组件内部的参数，然后 react 单向数据流的思想，也可以理解为 props 是父组件传递给子组件的数据；特别注意 **props** 不可以在组件内部修改，需要在 **父组件中修改**，直接修改 不会重新渲染。

#### 总结：

相同点：

​	1-都是用来保存数据的；

​	2-都是对象；

​	3-他们改变都会触发组件重新渲染；

不同点：

​	1-props 是外部参数，state 是组件内部维护的；

​	2-props 在组件内部是不可修改的，但 state 在组件内部可以进行修改；

## 6-函数式组件与类组件？