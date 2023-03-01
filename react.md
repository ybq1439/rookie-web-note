## 1-为什么 react 不推荐突变状态？

你当然可以更改原来的对象而不是生成一个新的，只是官方不推荐你这样写罢了，因为**React内部的代码是依赖这个不可变的约定来提高更新效率而已。**

### （1）简化复杂功能：

​	不可变性使得复杂的特性更容易实现，比如 react 官网上“井字棋” 游戏的 **时间旅行功能**，其实也就是 **撤销恢复功能**，不直接去修改数据，可以使得我们 追溯到之前的历史记录。可变（Mutable）数据耦合了 Time 和 Value 的概念，造成了数据很难被回溯。

### （2）跟踪数据的改变：

​	如果直接修改数据，那么很难跟踪到数据的改变。跟踪数据的变化需要 **可变对象** 于 **改变之前** 的版本对比，这样的话，整个对象树都需要遍历一次。

​	对于不可变数据而言，如果对象是一个新对象了，我们就认为对象发生改变了。

### （3）性能优化，确定在 react 中何时重新渲染：

​	不可变性最主要的优势在于它可以帮助我们在 React 中创建 *pure components*。我们可以很轻松的确定数据是否发生改变，从而确定何时对组件进行重新渲染。

## 说说你对immutable的理解，如何应用在react中？

### 什么是immutable Data?

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。

`Immutable` 实现的原理是 `Persistent Data Structure`（持久化数据结构）:

### 如何使用？

使用`Immutable`对象最主要的库是`immutable.js`，出现场景在于弥补 Javascript 没有不可变数据结构的问题。

其中有 3 种最重要的数据结构说明一下：（Java 程序员应该最熟悉了）

- Map：键值对集合，对应于 Object，ES6 也有专门的 Map 对象
- List：有序可重复的列表，对应于 Array
- Set：无序且不可重复的列表

常见API：

- fromJS()：将一个js数据转换为Immutable类型的数据
- toJS()：将一个Immutable数据转换为JS类型的数据
- is()：对两个对象进行比较
- get(key)：对数据或对象取值
- getIn([]) ：对嵌套对象或数组取值，传参为数组，表示位置



## 2-说说React render方法的原理？在什么时候会被触发？

### setState 一直是异步的吗？

​	setState 更新数据的时候，分为同步更新和异步更新。

​	异步更新：在组件生命周期或者 react 合成事件中，setState 是异步更新；

​	同步更新：在 setTimerOut 或者 原生 DOM 事件中，setState 是同步更新；

​	setState 的异步其实不是指 **内部由异步代码构成**，本身执行过程和代码都是同步的，只是因为 **合成事件、钩子函数** 的执行顺序在数据更新之前，所以出现 **合成事件和钩子函数** 中无法立马获取到更新后的值。

### setState 中的批量更新？

​	在 合成事件和生命周期钩子中，连续的调用 setState 只有最后一次会起作用。

## 4-说一说 hooks？

​	hook 是我们可以在 函数式组件中使用 类组件中的特性，例如 state。

### 	常用 hooks：

### 		（1）useState：在函数式组件中维护状态；

#### 	1-这种情况跳过`state`的更新：

​		`react`使用`Object.is()`比较相同，则会跳过子组件渲染，也不会触发`effect`。

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

​			（2）组件每一次重新渲染也会执行，保证 **执行下一次 effect 之前，上一个 effect 就已经清除**；也就i是重新渲染的时候，清除effect会先触发。

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

​	返回一个**`memoized`的值**。

​	记住，传入 `useMemo` 的函数会在**渲染期间执行**。

​	**你可以把 `useMemo` 作为性能优化的手段，但不要把它当成语义上的保证。**

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```



### useCallback：

​	返回一个**`memoized`的回调函数。**返回传入的回调函数的`memoized`版本。

​	记住，传入 `useMemo` 的函数会在**渲染期间执行**。

​	`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

### useCallback于useMemo的区别是什么？

​	它们的主要目的是不同的。`useMemo` 的主要目的是**对值进行记忆化**，从而避免在每次渲染时都重新计算值。而 `useCallback` 的主要目的是对**函数进行记忆化**，从而避免在每次渲染时都创建新的函数。

### （6）useContext：

```jsx
const MyContext =  React.createContext(info);//传递进去的是默认值，只有在没有找到上层Provider时，获取默认值
const value = useContext(MyContext);//传入的一个Context对象
```

### （7）useReducer：

​	React 会确保 `dispatch` 函数的标识是稳定的，并且**不会在组件重新渲染时改变**。这就是为什么可以安全地从 `useEffect` 或 `useCallback` 的依赖列表中**省略** `dispatch`。

​	`useState`升级版，能够实现对`state`更加复杂德逻辑。例如下面计数器。

```jsx
import React, { useReducer } from 'react';

const initState = { counter: 0 };
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { counter: state.counter + 1 };
        case 'decrement':
            return { counter: state.counter - 1 };
        default:
            throw new Error('action wrong');
    }
};
const ReducerTest = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <div>
            <h1>计数器:{state.counter}</h1>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    )
};

export default ReducerTest;
```

#### 惰性初始化：1-可以提取出初始化逻辑。2-重置state更加方便。

这里初始值经过计算后变成`1`。

```jsx
import React, { useReducer } from 'react';

const initState = { counter: 0 };
function init(initialCount) {
    return { counter: initialCount.counter + 1 }
};
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { counter: state.counter + 1 };
        case 'decrement':
            return { counter: state.counter - 1 };
        default:
            throw new Error('action wrong');
    }
};
const ReducerTest = () => {
    const [state, dispatch] = useReducer(reducer, initState, init);
    return (
        <div>
            <h1>计数器:{state.counter}</h1>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    )
};

export default ReducerTest;
```



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

## 7-Context

### 	APi：

​	1-React.createContext（）

​	2-Context.Provider

​	3-`Context.Consumer`：与 `useContext`用法不同，这个里面接受一个函数，参数为最近的`Provider`传递的`value`。

​	4-class.contextType：类组件上的一个属性，挂载 `Context`，通过`this.context`访问。

### 	更新`context`

​		特别注意，createContext 只是传递进入一个默认值，想要更新，可以传入一个 state,setState


```jsx
import React, { useState } from 'react';
import MyContext from './context';

const ContextPlay = () => {
    const [name, setName] = useState('ybq');
    return (
        <MyContext.Provider value={{ name, setName }}>
            <MyContext.Consumer>
                {
                    ({ name, setName }) =>
                    (
                        <div>
                            <h1>name:{name}</h1>
                            <button onClick={() => name === 'ybq' ? setName('yyy') : setName('ybq')}>修改名字</button>
                        </div>
                    )
                }

            </MyContext.Consumer>
        </MyContext.Provider>
    )
}
export default ContextPlay;
```

## 8-为什么不要把`index`作为`key`？

1. 进行添加，删除等破坏顺序的操作的时候，操作的该index之后的所有节点的index都会改变，导致误判key改变，造成不必要的真实DOM更新，导致性能变差；
2. 如果结构中包含输入类的 DOM，会产生错误的 DOM 更新。比如一些列的输入框，在数组首部插入一个新的输入框，那么之前的在第一个输入框输入的值，会渲染在新插入的输入框上，因为他们的**key都是1**；

## 9-react 中的事件机制？

#### 	**什么是合成事件**：

​	React基于浏览器的事件机制实现了一套自身的事件机制，它符合W3C规范，包括事件触发、事件冒泡、事件捕获、事件合成和事件派发等；在浏览器原生事件基础之上封装的一层抽象。

#### 	React事件的设计动机(作用)：主要是为了提高性能和优化内存管理。

1. 不同浏览器对事件对象的实现方式也不一样，导致代码可能会存在兼容问题，解决浏览器事件**兼容问题**；
2. 性能优化：
   1. 通过**事件委派**的方式：这样的方式不仅减少了内存消耗，还能在组件挂载销毁时统一订阅和移除事件。
   
      React中所有的事件，都是绑定在**`document`**，这样的好处就是一种事件，只会有一个事件处理对象了，减少事件对象。DOM原生事件，在每次触发事件的时候，都会创建一个事件对象，当一个元素绑定了多个事件处理函数时，每次触发事件，浏览器都会创建多个事件对象。如果有两个原素，注册了同样的对象，那么他就会有两倍多的事件对象，这样会产生很多**无用的对象**，并**占用大量内存**，影响性能。
   
      
   
   2. 通过事件池的方式：事件池是指在处理合成事件时，为了避免在每次**事件触发时都创建新的事件对象**，React 使用了一个事件池来管**理事件对象的创建和回收**。事件池中会**事先创建一些事件对象**，并在事件处理完成后重置这些对象的属性，以便下次重用。这样可以减少内存分配和回收的开销，提高事件处理性能。事件对象**数量是有限**的，如果短时间触发大量事件，会引起性能问题。
   
      1. 使用事件池的过程：当 React 合成事件触发时，会从事件池中获取一个事件对象，然后将原生事件对象封装在这个事件对象的 **`nativeEvent`** 属性中，再传入事件处理函数中。
   
         事件处理函数执行完成后，React 会将这个事件对象重置并归还到事件池中，以便下一次使用。这样可以避免频繁地创建和销毁事件对象，提高性能。同时，重置事件对象也可以避免在下一次使用时保留了上一次的状态，引起不必要的错误。

#### 与原生事件的一些差别：

​	1.写法有差别：合成事件中采用**小驼峰**，同时JSX语法中需要传递一个函数，而不是字符串；

​	2-在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

​	3-**最大的区别：**

​			**触发事件的时机不同**：合成事件触发时机在冒泡阶段，原生事件触发时机在冒泡阶段或者捕获阶段；

冒泡到DOM对象上的事件也不是原生浏览器事件，而是 React 自己实现的合成事件（SyntheticEvent）。因此我们如果不想要事件冒泡的话，调用 event.stopPropagation 是不行的，得调用 `preventDefault` 

​			**事件处理流程不同**：

​						合成事件：合成事件是通过事件委托机制来实现的，首先会在React组件内部触发对应的回调函数，然后最终到了document根元素后，触发绑定的原生事件。

​						为什么最后 还需要调用原生事件：虽然在事件冒泡过程中，合成事件已经执行了对应组件的事件处理函数，但是在 React 中，**事件处理函数仅仅是一个组件方法的调用**，**并不涉及真正的 DOM 操作**。这是因为 React 组件的更新是基于**虚拟 DOM** 的，而虚拟 DOM 是一种内存中的表示方式，并不直接对应浏览器中的 DOM 元素。

​					

## 10-react 为什么要使用jsx语法？

1. 关注点分离：实现**渲染逻辑和组件行为**分离。
2. 可以在JSX中直接使用JS表达式，使得**动态的 UI 渲染**更加方便。

## 11-如何理解react中元素的不可变性？

1. 在 React 中，元素（element）是一个不可变的对象，它描述了一个 UI 元素的属性和子元素。一旦一个元素被创建，它就不能被更改。
   1. diff过程中性能更好，如果元素是可变的，那么diff过程将会十分复杂；
      1. 为什么会有diff性能优化：React的Diff算法是通过比较两个元素的差异，然后仅更新必要的部分来实现高效更新UI的。如果元素是可变的，那么React就需要**比较当前元素和上一个元素的每一个属性是否都相同**，这样比较会非常耗时，尤其是在拥有大量组件和大量数据的复杂应用中。而当元素是不可变的时，我们可以**简单地通过比较两个元素的引用来检查它们是否相等**，从而避免了大量的计算，使得diff过程更加高效。因此，元素的不可变性是React高效渲染的重要基础之一。
   2. 与**`状态的不突变性`**共同保证了**单向数据流**，确保应用数据的可预测，维护性；

## 12-如何理解HOC这种设计模式？解决什么问题？什么优点？

​	HOC是一种利用了，react组合特性的设计模式。它是一个函数，输入的参数是组件，返回的值也是组件。HOC 可以帮助我们提高代码的复用性，减少重复代码，同时也可以更加灵活地控制组件的逻辑和渲染方式

优点：

1. 代码复用：将多个组件中重复的逻辑提取出来，放在一个 HOC 中，其它组件通过使用 HOC 可以轻松获得这些功能，提高代码复用率。
2. 组件组合：HOC 可以将多个组件组合起来，形成一个新的组件，并且这些组件可以**共享一些相同的状态和逻辑**。
3. 渲染劫持：通过 HOC 可以劫持原组件的渲染流程，在**渲染前后添加一些逻辑**。
4. 条件渲染：通过 HOC 可以**根据条件动态选择渲染不同的组件**。

## 13-react中的避免调停？

### 什么叫做避免调停？

（Avoiding UI Blocking）是一种优化策略，它能够确保在组件中只有必要的部分才会被重新渲染。

### 通过什么实现的？

React的避免调停主要是通过虚拟DOM和DOM-diff算法实现的。

## 14-说说你是如何提高组件的渲染效率的？在React中如何避免不必要的render？

### shouldComponentUpdate

通过`shouldComponentUpdate`生命周期函数来比对 `state`和 `props`，确定是否要重新渲染，默认情况下返回`true`表示重新渲染，如果不希望组件重新渲染，返回 `false` 即可。

```js
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
```

### React.PureComponent

#### 是什么？

`React.PureComponent` 是 React 中的一个内置组件，它是 `React.Component` 的一个变体。它通过实现 **`shouldComponentUpdate`** 方法来对组件的更新进行优化，自动对组件的 `props` 和 `state` 进行**浅层比较**，避免不必要的渲染。

```jsx
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

### React.memo？

`React.memo` 是一个**高阶组件**（Higher Order Component，简称 HOC），用于对**函数式组件**进行**浅层比较的优化**，类似于 `React.PureComponent`。当组件的输入参数没有变化时，`React.memo` 将会直接返回之前的渲染结果，避免不必要的重新渲染。

第二个参数：比较函数，它用来决定是否更新组件。比较函数接收两个参数：前一个和后一个 props 对象。如果比较函数返回 `true`，则说明组件不需要更新；如果返回 `false`，则说明组件需要更新。

```jsx
import { memo } from 'react';
function arePropsEqual(prevProps, nextProps) {
  // your code
  return prevProps === nextProps;
}

export default memo(Button, arePropsEqual);
```

## 15-为什么react要推崇单向数据量和不可变数据？

简化状态管理，降级应用复杂度，提高性能和可维护性。

## 16-react中组件通信的一些方法？

#### 父组件向子组件传递？

props；

#### 子组件向父组件传递？

通过回调函数实现；

#### 兄弟组件之间通信？

可以通过共同的父组件实现；

#### 父组件向后代传递？

可以通过`context`实现。

#### 非关系组件传递

全局状态管理，例如`redux`。

## 17-redux的使用。

#### 1-三大基本原则：

1. ##### 单一数据源；

   为什么要使用单一数据源？

   **整个应用的 [全局 state](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#state) 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 [store](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#store) 中。**

   1-简化状态管理：将应用程序的状态集中到一个地方，可以更轻松地管理和维护应用程序的状态，也更好去调试应用。

   2-方便进行持久化存储：因为是把整个应用的状态都存储在一个地方；

   3-简化一些复杂逻辑，如“撤销、重做”；

2. ##### `state`是只读的，禁止直接修改`state`，**唯一改变 state 的方法就是触发 [action](https://cn.redux.js.org/understanding/thinking-in-redux/glossary)，action 是一个用于描述已发生事件的普通对象。**；

   优点：

   ​	1-只能通过`action`修改`state`，所有的修改都会集中的处理，并且是严格按照顺序一个一个处理，不需要担心**`竞态条件`**的出现。什么叫竞态条件？多个组件同时操作一个`state`，但是执行的时间、顺序却无法确定，导致出现错误。

   ​	2-易于调试：由于所有的修改都是通过action来派发的，因此在调试过程中可以很方便地追踪到修改的来源和修改的历史记录。

3. ##### 使用纯函数执行修改；

   **为了描述 action 如何改变 state tree，你需要编写纯的 [reducers](https://cn.redux.js.org/understanding/thinking-in-redux/glossary#reducer)。**

   ###### 什么是纯函数？

   纯函数是指如果输入一致，那么输出也会是一致的，不能有任何的副作用，异步请求不行。

   Reducer 是纯函数，它接收之前的 state 和 action，并返回新的 state。记住，一定要**返回一个新的对象**，而不是修改之前的 state。

   ###### 为什么一定要返回一个新的对象？

   1-确保数据的不可变性。为什么需要不可变性？因为在`redux`与`react-redux`中，都是用`浅相等检查`。浅相等检查，只会去检查两个对象的引用，能够快速的确定**数据是否变化**，确定何时需要**重新渲染**，优化性能。

   不可变性还可以保证**`redux时间旅行`**工作正常。在Redux中，我们可以通过存储**每个状态的快照**，实现时间旅行功能，也就是允许用户撤销和重做操作。如果Reducer直接修改原始的状态对象，那么就无法正常实现时间旅行功能，因为旧的状态对象会被更新，无法保存历史状态的快照。
   
   ###### 为什么一定要使用纯函数？
   
   只有使用纯函数，那么state的修改都是可以预测的，才能保证`redux`正常工作，如**时间旅行**功能。
   
   #### 使用纯函数的好处？
   
   由于 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

#### 2-为什么异步请求，要单独抽取出中间件来管理？

​	异步请求不能够放在`reducer`里面，因为要保证它是纯函数。

​	1-如果在异步请求完成之前，用户进行了其他操作，会导致数据不一致等问题，数据的结果变得无法预测。
​	2-异步请求一般会有不同的结果，如果所有的异步请求都放在`reducer`中处理，那么`reducer`的逻辑会变得很复杂，难以维护；

​	**`redux-thunk`**是官网推荐的异步处理中间件。