## 浏览器渲染过程

### 1-什么是文档的预解析？

​	传统的浏览器渲染页面的时候，遇到 script 标签有可能会被阻塞 HTML 解析器会暂停，直到脚本加载并执行。在 Firefox 中，支持先加载资源，Firefox4 中还会构建 DOM 树。

​	优点：加快页面渲染速度；

### 2-CSS 如何阻塞文档渲染？（不会阻塞解析）

​	虽然 CSS 的加载不会影响到 DOM，但是如果 JS 去操作了 DOM 的一个样式，而这个时候 样式还没有加载，就会操作失败。

​	所以如果浏览器还没有构建成功 CSSOM 树，那么 JS 脚本的执行和文档解析都会先等待 CSSOM 的构建。

### 3-渲染页面常见不良现象？

#### 	FOUC（flash of unstyled content）

​	是指浏览器渲染页面时，样式还没有加载完成，就先显示了默认样式，之后样式加载完成了，又显示了样式。

​	出现原因：CSS 加载时间太长（例如使用 @import 引入的样式太耗时）、CSS 加载写在 HTML 文档最后面，而中间渲染比较耗时。

​	优化：写提示内容，在页面一开始就通过 CSS 控制 只有提示内容显示。记载完成后，在加载的 CSS 样式中 设置只有 提示内容隐藏。

#### 	白屏（阻塞页面渲染）

​	出现原因：CSS 写在头部，但是加载耗时； script 写在头部，加载耗时；

### 4-DOMContentLoaded 事件和 Load 事件区别？

#### 	DOMContentLoaded：

​	在 HTML 文档被完全加载和解析完成之后执行，不需要等待样式表以及其他资源的加载；

#### 	Load：

​	在所有的资源加载完成之后触发。

## HTML相关

### 1-HTML5 新增特性？

​	1-画布 canvas；

​	2-媒体播放：video,audio；

​	3-本地存储：localStorage sessionStorage；

​	4-语义化标签：article, footer,header,nav,section；

​	5-拖拽 API；

​	6-Input 新增类型，例如：date、email、number；

​	7-新的技术：webWorker 支持后台运行 JS；

​	8-新的通信协议 webSocket：建立在 TCP 连接上，全双工通信；

### 2-解决 HTML5 新特性兼容问题？

​	1-如果没有这个标签，使用 document.createElement 创建一个，同时设置它的样式；

​	2-使用 html5shiv.js；

### 3-cookie、localStorage、sessionStrage 区别？

​	1-存储空间大小：

​		cookie：不超过 4K；

​		locaStorage,sessionStorage：可达 5M 或者更大；

​	2-有效时间与存储位置：

​		localStorage：存储磁盘、长期存储；

​		sessionStorage：存储浏览器内存，关闭窗口（浏览器）清除；

​		cookie：存储磁盘，过期时间前可以使用；

​	3-作用域：

​		cookie：所有同源窗口都是共享的；

​		localStorage：所有同源窗口共享；

​		sessionStorage：只在同源并且同窗口同共享；		

## CSS 相关内容

### 1-如何解决 CSS3 兼容问题？

​	1-浏览器 CSS 样式进行初始化；

​	2-CSS 属性添加浏览器私有前缀：-webkit-,-moz-,-ms-；

​	3-使用 CSS hack：

​		（1）条件 hack：IE 条件注释；

```html
<!--[if <keywords>? IE <version>?]>
    代码块，可以是html，css，js
<![endif]-->
```

​		（2）属性 hack：通过在 CSS 属性前加上不同的前缀实现；

​		（3）选择器 hack：选择器前加上不同前缀实现；

## JavaScript 相关

### 1-解析字符串中的数字和字符串强制类型转化的区别？

​	在一个字符串中含有非数字字符时会有差别，parseInt 会解析到第一个非数字，而强制类型转化会直接返回 NaN

```javascript
let str = '12345ab6';
let useParse = parseInt(str)
let useNumber = Number(str)
console.log('useParse', useParse)//12345
console.log('useNumber', useNumber)//NaN
```

### 2-isNaN 和 Number.isNaN 函数的区别？

isNaN：传入的参数直接转化为 Number，所以其他非 NaN 的非 Number 类型传入也会返回 true；

Number.isNaN：首先判断传入参数的类型，只有传入的参数为 NaN 才会返回 true；

### 3-其他值转化为字符串规则？

​	1-Symbol：只允许显示强制类型转化，使用隐式类型转化报错；

​	2-Object：除非自行定义 toString() 方法，否则调用 Object.prototype.toString() 返回内部属性 [[Class]]。例如："[object,Object]"； 

### 4-其他值转 Number 类型？

​	1-Symbol：不能够转，直接报错；

​	2-对象：首先通过 valueOf() 转化为基本数据类型，如果没有通过 toString() 转化，如果两个都不是基本数据类型，直接报错；之后在通过 基本数据类型转化 Number；

### 5-{} 和 [] 的 valueOf 和 toString 的结果是什么？

```
{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"；

[] 的 valueOf 结果为 [] ，toString 的结果为 ""；
```