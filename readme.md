# 浏览器

## 浏览器缓存

### 1-强缓存与协商缓存同时存在，那么强缓存 >协商缓存。

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

### 5-如何减少重绘重排？

​	1-避免使用 table 布局，因为 table 布局中每个元素大小以及内容改变都会导致整个 table 重新计算；

​	2-设定样式避免 一个属性一个属性的加，可以写在一个类里面，然后添加类；

​	3-应用元素的动画，尽量使用定位 fixed` 值或 `absolute 脱离文档流；

​	4-不要频繁的操作  DOM 例如：不要把节点的属性值放在一个循环里当成循环里的变量；

# HTML相关

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

​		sessionStorage：只在同源并且 **标签页** 共享；		

### 4-async 和 defer 的区别？

​	都可以用来异步加载 js，使得 js 文件加载不会阻塞页面渲染，这两个主要的区别是对于 JS 文件的执行的区别。 

​	1-async：文件加载完毕就立即执行，无法保证执行顺序；

​	2-defer：文件加载完毕等到文档解析完成之后再 **执行脚本**，会在 DOMContentLoaded 事件之前执行，执行顺序与加载顺序一致；

# CSS 相关内容

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

# JavaScript 相关

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
//parseInt('2',1) 这里把 1进制的 '2' 转化为 10 进制，很明显，1 进制里面没有 2，所以会返回 NaN
//parseInt('3',2) 同上
```

### 6-运算符优先级（部分）

![image-20220821201140668](/Users/yibinqi/Library/Application Support/typora-user-images/image-20220821201140668.png)

[前端程序员经常忽视的一个JavaScript面试题 · Issue #85 · Wscats/articles (github.com)](https://github.com/Wscats/articles/issues/85)

### 7-什么是假值对象？

​	浏览器在特定情况下，在常规的 JS 语法基础上 **自己创建一些外来值**，这些值就是 **假值对象**，假值对象强制转化为 布尔类型是 结果是 **false**；例如：**document.all** 它就是一个类数组对象，包括了页面上的所有元素，是 **dom** （而不是 **js 引擎**）提供给 js 程序使用。　

### 8-js 创建对象的方式？

​	引言：我们一般使用 **字面量** 的方式创建一个对象，但是如果 需要创建大量的相似的对象，这种方法就会很多重复代码。JS 不像其他面向对象语言，我们创建类是通过函数来模拟实现的， ES6 才引入了类的概念，其实也是使用的 函数来模拟的对象。

#### 	1-工厂模式：

​		直接把对象封装在一个函数里面，然后函数返回这个对象，缺点：**它只是简单的封装了复用代码，而没有建立起对象和类型间的关系。**

```javascript
function createPeople(name,age) {
    //创建字面量的方式
    var people={
        name:name,
        age:age,
        say:function () {
            console.log('我叫'+this.name+', 今年'+this.age+'岁。');
        }
    };
    return people;
}

var shaHeShang=createPeople('沙和尚',15);
console.log(shaHeShang);
shaHeShang.say();

var xiaoBaiLong=createPeople('小白龙',13);
console.log(xiaoBaiLong);
xiaoBaiLong.say();
```

#### 	2-构造函数模式：

​		优点：创建的对象和构造函数、原型对象之间存在关系；

​		缺点：如果需要构造的对象一个属性是函数，那么这个函数就会被重复创建 N 次，浪费空间；

#### 	3-原型模式：

​		将公用属性、方法放到原型对象上去，

​		优点：解决 构造函数 如果属性是函数时候，创建 N 次函数浪费空间；

​		缺点：如果公用属性是引用数据类型，那么所有的 **实例共享** 这个属性；不能够通过给参数来给初始值；

```javascript
    function Person() {}
    Person.prototype = {
      name: "jayZhou",
      age: "48",
      loves: ["奶茶", "昆凌", "唱歌"],
    };
    let jj = new Person();
    let jay = new Person();
    console.log(jj.name, jay.name);
```

#### 	4-组合使用 构造模式和原型模式：

​		缺点：两种模式一起用，代码封装性没那么好；

#### 	5-动态原型模式：

​		通过判断原型上是否存在属性、方法，做到只在第一次构造函数的时候，在原型上添加属性；

​		优点：完善上一种 封装性；

```javascript
function Person(name,age,job){
    //属性
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["杜甫","陶渊明"];

    //方法
    if(typeof this.sayName != 'function'){
        Person.prototype.sayName = function(){
            console.log(this.name);
        }
    }
}

//实例化对象
var person1 = new Person("李清照",40,"南宋词人");
var person2 = new Person("李白",50,"初唐诗人");

person1.friends.push("杜牧");

console.log(person1.friends);//"杜甫","陶渊明","杜牧"
console.log(person2.friends);//"杜甫","陶渊明"

console.log(person1.friends === person2.friends);//false
console.log(person1.sayName === person2.sayName);//true
```

#### 	6-寄生构造函数模式：

​		类似于工厂模式，只是调用了 new 

​		使用场景：主要是对已有类型进行 **拓展**。例如为 Array 添加新的方法。

```javascript
function SpecialArray() {
	// 创建数组
	var values = new Array()
	// 添加值
	values.push.apply(values, arguments)
	// 添加方法
	values.toPipedString = function(){
		return this.join('|')
	}
	// 返回数组
	return values
}

var colors = new SpecialArray('red', 'green', 'blue')
console.log(colors.toPipedString())
```

# 其他

## NPM 包管理

### 1-npm install xxxx --legacy-peer-deps 作用？

#### *peerDependencies* 的作用？

​	避免多个插件依赖的同一个包，重复安装。https://juejin.cn/post/6971268824288985118

#### --legacy-peer-deps 的作用？

​	标志是在v7中引入的，目的是绕过peerDependency自动安装；它告诉 NPM 忽略项目中引入的各个modules之间的相同modules但不同版本的问题并继续安装，保证各个引入的依赖之间对自身所使用的不同版本modules共存。**就是允许下载同一个包的多个版本**。

### 2-npm install xxxx --force 的作用？

重新下载安装所有的依赖包。	

### 3-package-lock.json 的作用？

​	用于锁定 依赖的版本，从而保证每一个工程中的依赖版本都是100%相同的。保证大家 npm install 的依赖版本都是一样。

出现原因：

​	在 package-lock.json 出现之前，是使用 semver 表示法设置可以升级的版本：

- 如果写入的是 `〜0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
- 如果写入的是 `^0.13.0`，则要更新补丁版本和次版本：即 `0.13.1`、`0.14.0`、依此类推。
- 如果写入的是 `0.13.0`，则始终使用确切的版本。

​	例如：如果依赖写的是 ~0.13.0 那么实际 npm install 的时候，如果有补丁版本的话，会安装成 0.13.2，这样的话，大家 npm install 的依赖版本就无法保证一样了。

## 事件循环

### 	1-宏任务与微任务有哪些？

#### 		宏任务：setTimeout、setInterval、setImmediate、ajax 请求回调；

#### 		微任务：Promise.then().catch().finally()、process.nextTick()；

## webpack

### 1-webpack  是什么？

​	webpack 是一个用于现代 JavaScript 应用程序的 **静态模块-打包工具**。

​	webpack 的能力：

​		1-编译代码能力，能够把开发阶段使用的例如像 ES6+ 的语法转译成 ES5 语法，从而提高开发效率，解决浏览器兼容问题；

​		2-模块整合能力：在生产环境的时候，可以把散落的模块打包到一个 bundle.js，**解决了浏览器频繁请求模块文件的的问题**；

​		3-万物皆模块的能力：webpack 可以将开发过程中使用的 **样式、图片、字体等资源文件** 都作为模块使用，这样就拥有了一个统一的模块化方案，所有 **资源文件的加载都可以通过代码控制** ，可以与业务代码一同维护，提高项目可维护性；

### 2-webpack 打包流程？

​	webpack 运行流程是一个 **串行过程**，在运行过程中会广播事件，然后对应的插件会监听它关心的事件，介入打包过程，这样的机制使得 wepack 拓展性很好。

​	整个过程可以分为三个阶段：

​		1-初始化流程：从 **配置文件和 shell 语句** 中读取与合并参数，并且初始化需要使用的 **插件**，已经配置 **插件执行环境等**。

​		2-编译构建流程：从（entry）入口文件触发，针对每一个 module 调用对应的 Loader，去翻译文件的内容，同时找到 module 依赖的 module 递归的去编译处理；

​		3-输出流程：对编译后的 module 合并成 chunk，把 chunk 转化成文件，输出到操作系统。

### 3-webpack plugin 和 loader 的区别？

​	1-loader：是指文件加载器，能够加载资源文件 例如 **.less、.sass、.png**，并且对这些文件进行处理，例如编译、压缩等，最后一起打包到指定文件中；

​	2-plugin：增强 webpack，能够实现一些原生不支持的功能，例如：打包优化、资源管理、环境变量注入等。

### 4-常见 loader、plugin？

​	1-loader：style-loader（将css添加到DOM的内联样式标签style里）、less-loader（处理 less 文件）、babel-loader（使用 babel 转义 es6+）、html-minify-loader（压缩 html 文件）；

​	2-plugin：CompressionWebpackPlugin（同时输出资源压缩版本）、MinChunksSizePlugin（指定 chunk 文件大小的最小值）

## 动画

### 1-如何优化动画的加载？

####  js 方面：

​	（1）使用 **requestAnimationFrame** 取代 setTimeout、和 setInterval：它们两个都是宏任务，需要同一次事件循环中的 同步任务与 微任务队列 执行完成，才会拿出一个执行，这个是无法保证 **动画执行的时间**，也就有可能掉帧。

​		requestAnimationFrame 优化：1-CPU 节能，当页面隐藏或者最小化时，会暂停渲染；2-函数节流，它的循环间隙时由 **屏幕刷新率决定的**，保证回调函数在屏幕的每一次刷新间隙中只会执行一次。

​	（2）使用 web Worker：把一些耗时 操作数据的，不影响 UI 的任务可以放到 worker 线程中后台执行，避免主线程的拥堵；

#### layout 阶段：

​	避免不断的去触发重排，可以将动画 绝对定位 脱离文档流。

​	尽量使用 **transform** 、**opacity** 去创建动画；

#### paint 阶段：将移动元素或者渐变元素由 渲染层 提升到 合成层

​	优点：只会重绘需要重绘的部分，合成图的位图直接由 GPU 合成，比 CPU 快；

## 性能优化

### 	1-路由懒加载减少 js 文件大小的原因是什么？

​		路由懒加载使用的是 **webpack code splitting**，当我们使用路由懒加载时，对应懒加载的组件 会被从最终的 app.js 中抽离出来，形成单独的 js 文件，只有在需要进入这些页面的时候，才会去 加载对应的 文件。

### 	2-图片太多优化加载？

​		1-图片如果过大，可以压缩图片；

​		2-使用缓存，也可以使用 CDN 加速服务；

​		3-可以使用 专门的 **图片服务器** 管理图片资源；

​		4-图片懒加载、以及虚拟列表；

​		5-雷碧图，小icon合并成一张图片,通过**background-position** 来控制显示icon。减少请求，这些图片资源请求合成一个；

### 	3-虚拟列表实现原理？？