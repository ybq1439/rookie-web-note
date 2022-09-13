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

### 5-如何减少重回重排？

​	1-避免使用 table 布局，因为 table 布局中每个元素大小以及内容改变都会导致整个 table 重新计算；

​	2-设定样式避免 一个属性一个属性的加，可以写在一个类里面，然后添加类；

​	3-应用元素的动画，尽量使用定位 fixed` 值或 `absolute 脱离文档流；

​	4-不要频繁的操作  DOM 例如：不要把节点的属性值放在一个循环里当成循环里的变量；

## HTML相关

### 1-HTML5 新增特性？

​	1-画布 canvas；

​	2-拖拽 API；

​	3-媒体播放：video,audio；

​	4-语义化标签：article, footer,header,nav,section；

​	5-Input 新增类型，例如：date、email、number；

​	6-本地存储：localStorage sessionStorage；

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

​		sessionStorage：只在同源并且同窗口共享；		

### 4-async 和 defer 的区别？

​	都可以用来异步加载 js，使得 js 文件加载不会阻塞页面渲染，这两个主要的区别是对于 JS 文件的执行的区别。 

​	1-async：文件加载完毕就立即执行，无法保证执行顺序；

​	2-defer：文件加载完毕等到文档解析完成之后再 **执行脚本**，会在 DOMContentLoaded 事件之前执行，执行顺序与加载顺序一致；

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

​		（3）选择器 hack：选择器前加上不同前缀实现；		

​		（3）属性 hack：通过在 CSS 属性前加上不同的前缀实现；

### 2-CSS 属性继承性？

​	每一个属性在定义的时候，都给出了是否可以继承，一个可以被继承的属性，在子元素没有定义的时候，会默认使用父元素的值。

​	常见的一些可继承属性：

​		1-字体相关的属性：如 font-size, font-weight 等；

​		2-文本相关的属性：如 color, text-align 等；

​		3-表格的相关属性；

​		4-列表的相关属性：如 list-style；

​		5-光标属性：cursor；

​		6-元素可见性：visibility；

​	如果我们想要一个原本不能够被继承的元素变为继承，可以设置它的值为 inherit；

### 3-伪类 LVHA 的理解？

​	L：link（没有被访问的状态）；

​	V：visited（已经访问的状态）；

​	H： hover（鼠标滑过的状态）；

​	A：active（以选中的状态）；

​	其中 hover 要有效果，必须要放到 link, visited 的后面；active 必须放到 hover 后面。

​	link 和 visited 可以交换位置。

### 4-使用纯 CSS 实现三角形原理？

​	相邻边框之间会均分的原理。

​	把盒子宽高设置为 0，然后其他 边框全部设置为透明，留下需要的边框。

​	![image-20220817103547266](/Users/yibinqi/Library/Application Support/typora-user-images/image-20220817103547266.png)

### 5-@import 和 link 标签引入样式表区别？

​	1-@import 是 CSS 中的语法规则，link 可以引入其他资源；link 兼容性更好；

​	2-@import 引入的样式需要页面解析完成后才会加载；

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

​	2-Object：除非自行定义 toString() 方法，否则调用 Object.prototype.toString() 返回内部属性 [[Class]]。

例如："[object,Object]"； 

### 4-其他值转 Number 类型？

​	1-Symbol：不能够转，直接报错；

​	2-对象：首先通过 valueOf() 转化为基本数据类型，如果没有通过 toString() 转化，如果两个都不是基本数据类型，直接报错；之后在通过 基本数据类型转化 Number；

### 5-{} 和 [] 的 valueOf 和 toString 的结果是什么？

```
{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"；

[] 的 valueOf 结果为 [] ，toString 的结果为 ""；
```

####  ["1", "2", "3"].map(parseInt) 答案是多少？

​	注意：1-paser.Int(str,radix) 解析字符串，返回指定基数的 **十进制整数**。也就是说，把 str 看作是 radix 进制的整数，然后转化为十进制数。radix 假如指定 0 或未指定，基数将会根据字符串的值进行推算。

​				2-map 传入的参数为 (item,index,array) 默认传递前两个参数；

```javascript
const result = ["1", "2", "3"].map(parseInt)
console.log(result)//[ 1, NaN, NaN ]

//等同于以下代码
["1", '2', '3'].map((item, index) => {
    return parseInt(item, index)
})
//三个结果分别是 parseInt('1',0) radix 指定为 0，依据字符串推算，就是十进制数转化为十进制数
//parseInt('2',1) 这里把 '2' 按照 1 进制转化为 10 进制，很明显，1 进制里面没有 2，所以会返回 NaN
//parseInt('3',2) 同上
```

### 6-运算符优先级（部分）

![image-20220821201140668](/Users/yibinqi/Library/Application Support/typora-user-images/image-20220821201140668.png)

## 其他

### 1-package-lock.json 的作用？

​	用于锁定 依赖的版本，从而保证每一个工程中的依赖版本都是100%相同的。保证大家 npm install 的依赖版本都是一样。

出现原因：

​	在 package-lock.json 出现之前，是使用 semver 表示法设置可以升级的版本：

- 如果写入的是 `〜0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
- 如果写入的是 `^0.13.0`，则要更新补丁版本和次版本：即 `0.13.1`、`0.14.0`、依此类推。
- 如果写入的是 `0.13.0`，则始终使用确切的版本。

​	例如：如果依赖写的是 ~0.13.0 那么实际 npm install 的时候，如果有补丁版本的话，会安装成 0.13.2，这样的话，大家 npm install 的依赖版本就无法保证一样了。

## NPM 包管理

### 1-npm install xxxx --legacy-peer-deps 作用？

#### *peerDependencies* 的作用？

​	避免多个插件依赖的同一个包，重复安装。https://juejin.cn/post/6971268824288985118

#### --legacy-peer-deps 的作用？

​	标志是在v7中引入的，目的是绕过peerDependency自动安装；它告诉 NPM 忽略项目中引入的各个modules之间的相同modules但不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本modules共存。**就是允许下载同一个包的多个版本**。

### 2-npm install xxxx --force 的作用？

重新下载安装所有的依赖包。	

