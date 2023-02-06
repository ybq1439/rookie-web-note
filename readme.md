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

### 6-浏览器打开一个页面需要启动多少进程？（至少 4 个）

​	浏览器从关闭状态进行启动，然后打开一个页面，至少需要 **1个网络进程、1个浏览器主进程、1个 GPU 进程、1个渲染进程**，后面再打开新的页面，浏览器主进程、网络进程、GPU 进程是共享的。如果两个页面是同一站点的话，并且从 a 中打开 b 的话，他们两个共享一个 渲染进程。

### 7-chrome  一共有多少进程？

​	1个浏览器主进程、1个 GPU 进程、1个网络进程、多个渲染进程（**同站点共用一个渲染进程**）、多个插件进程。

### 8-浏览器渲染进程中有 多少线程？

#### 	（1）GUI 渲染线程：

​			负责渲染页面，解析html和CSS、构建DOM树、CSSOM树、渲染树、和绘制页面，重绘重排也是在该线程执行；

#### 	（2）JS 引擎线程：

​			一个 tab 页中只有一个 **JS 引擎**，负责解析和执行 js。他和 GUI 渲染线程不能够同时执行；

#### 	（3）计时器线程：

​			指setInterval和setTimeout，因为JS引擎是单线程的，所以如果处于阻塞状态，那么计时器就会不准了，所以需要单独的线程来负责计时器工作；

#### 	（4）事件触发线程：

​			主要用来控制 **事件循环**，比如JS执行遇到计时器，AJAX异步请求等，就会将对应任务添加到事件触发线程中，在对应事件符合触发条件触发时，就把事件添加到待处理队列的队尾，等JS引擎处理；

#### 	（5）异步 http 请求线程：

​			 XMLHttpRequest连接后浏览器开的一个线程，比如请求有回调函数，异步线程就会将回调函数加入事件队列，等待JS引擎空闲执行；

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

### 6-CSS 中选择器的优先级？

​	`!important` > `内联样式` > `ID 选择器` > `类选择器、伪类选择器、属性选择器` > `标签选择器、伪元素选择器` > `通配符、子类选择器、兄弟选择器` > `继承的样式` ；



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

###  ["1", "2", "3"].map(parseInt) 答案是多少？

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

### [10,10,10],map(parseInt) 答案？

为什么最后一个是2，因为 这是 二进制 1 0，所以是2。

```javascript
    const result = [10, 10, 10].map(parseInt);
    console.log('parseInt result:', result)//10,NaN,2
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

### 9-proxy 和 object.defineProperty 对比？

#### object.defineProperty：

​	1-会直接在 **对象上添加或者修改属性**，并返回这个对象；

#### 	VUE2.x 中数据劫持存在问题：

​	1-无法监测到 数组的变化；

​	2-对象的监测，需要对每一个属性都 调用 object.defineProperty 方法，创建对应的 setter、getter；

```javascript
Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    // ...
  })
})
```

#### proxy：

​	Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。对对象的操作，会先通过 **代理对象**，随后转发到 源对象。handler 中总共有13中拦截操作；

语法：

```javascript
const p = new Proxy(target, handler)
```

#### 	VUE3.x 中使用 proxy 解决问题：

​	1-Proxy 是针对 **整个对象** 而言的，而不是 **对象的某个属性**，所以不需要遍历对象的每一个属性去设置 get、set；

```javascript
let obj = {
  name: 'Eason',
  age: 30
}
let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)
proxy.name = 'Zoe' // set name Zoe
proxy.age = 18 // set age 18
```

​	2-Proxy 能够支持监测数组的变化，不需要对数组方法进行重载；

#### 嵌套支持：两种都不支持，都需要逐层递归解决；

proxy做法：get 拦截里面，递归调用 Proxy 并返回；

```javascript
let obj = {
  info: {
    name: 'eason',
    blogs: ['webpack', 'babel', 'cache']
  }
}
let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    // 递归创建并返回
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)
// 以下两句都能够进入 set
proxy.info.name = 'Zoe'
proxy.info.blogs.push('proxy')
```

### 10-获取 input 框中值的方式？

​	（1）**ID**：document.getElementById('input').value；

​	（2）**class**：document.getElementsByClassName('class_name')[index].value；

​	（3）**Tag**：document.getElementsByTagName('tag_name')[index].value；

​	（4）**Name**：document.getElementsByName("searchTxt")[0].value;

​	（5）使用 CSS 的选择器来获取：document.querySelector('selector').value、document.querySelectorAll('selector')[index].value；

### 11-javaScript 中的垃圾回收机制？

#### 	（1）引用计数法：通过判断变量的引用数判断是否要回收，如果引用数等于 0 就回收；

##### 	缺点：

​	1-如下：如果变量互相引用，那么它们两个的引用数都会大于等于1，不会被回收，造成内存泄漏；

```javascript
function fn () {
  const obj1 = {}
  const obj2 = {}
  obj1.a = obj2
  obj2.a = obj1
}
fn()
```

​	2-引用计数法，需要一个计数器，需要占用比较多的资源；	

#### （2）标记清除算法：最常用垃圾回收机制。

​		大致过程：（1）垃圾收集器在运行时给内存中的所有变量都加上一个标记，默认标记为 垃圾；（2）然后从根节点开始遍历，把不是垃圾的节点标标记 不是垃圾；（3）清除所有标记为 垃圾的变量，释放内存；（4）最后把所有的变量都重新标记为 垃圾，等待下次垃圾回收；

### 12-什么叫类数组？如何把类数组转化为数组？

#### 	（1）类数组是什么？

​	它是一个对象，是 `Object` 的实例，不是 `Array` 的实例;

#### 	（2）数组共同点

##### 			1-可以使用下标访问对象；

##### 			2-拥有 `length` 属性；

#### 	（3）不同点

##### 			1-不是 `Array` 的实例，也就无法使用到 `Array.prototype` 上的方法；

##### 			2-可以用 `.` 运算符号，定义其他属性；

#### 	（4）如何转化为一个真实数组？

##### 			1-使用 `Array.from` 方法可以；

##### 			2-使用 展开运算符 `[...objArr]` 就可以；

##### 			3-`Array.prototype.slice.call(arrLike)`；

#### 	（5）JS 中的一些类数组：

##### 			1-函数中的 `arguments` 对象；

##### 			2-`querySelectorAll` 选择的 元素集合 `HTMLCollection `；

### 13-JS 中的内置对象有哪些？

#### 	1-值属性：NaN、undefined;

#### 	2-函数：isNaN()、parseInt()、parseFloat();

#### 	3-基本对象：Object、Function、Boolean；

#### 	4-数字日期：Number,Math,Date,BigInt;

#### 	5-字符串：String；

### 14-Array.from,Array.of？

#### 	1-Array.from:把一个`可迭代对象`或者`伪数组`转化为数组；

#### 	2-Array.of:创建数组，而不考虑参数的数量和类型；和Array(7)的区别在于，Array(7)会创建`length===7`的空数组；

```javascript
Array.of(7); // [7]
Array(7); // array of 7 empty slots

Array.of(1, 2, 3); // [1, 2, 3]
Array(1, 2, 3);    // [1, 2, 3]
```

### 15-addeventListener 第三个参数？

```javascript
//语法
addEventListener(type, listener, options);
addEventListener(type, listener, useCapture);
```

#### 	1-第三个参数为一个`options`对象，可以控制事件的触发：

​		options 的一些属性：

​		1-`capture`：为`true`,事件会在捕获阶段触发;

​		2-`once`：为`true`，事件只会被触发一次；

​		3-`passive`：`true` 永远不会阻止默认事件发生；

#### 	2-第三个参数为一个`boolean`值，控制这事件在传播的时候，触发：

​		`useCapture`:`true` 事件捕获阶段触发。

### 16-`弱 map`和`弱 set`？

#### 弱`map`与 `map`的区别：

​	（1）弱 map 只接受**对象，引用地址**作为键；而 map 的键和值都可以是任何类型；

​	（2）`weakMap`中的键所指的对象，是一个弱引用，垃圾回收的时候，不会把`weakMap`的引用考虑，如果该对象其他的引用为空了，那么这个对象会被回收掉；

​	（3）确定`键的唯一性`，`weakMap`是看地址引用；

#### `weakSet`与`set`的区别：

​	（1）`set`里面的元素可以是任意类型值，但是`weakSet`中的元素只能是`对象`;

​	（2）`weakSet`判断唯一性，就是元素的地址啦；

​	（3）`weakSet`元素是弱引用，里面的对象是会被垃圾回收机制回收的；

​	（4）也就是因为是弱引用，所以`weakSet`是无法遍历的，因为有可能两个时刻，有的元素被回收了；

#### `weakSet`api

​	（1）add(val)；

​	（2）delete(val);

​	（3）has(val);

​	（4）size(无)；

### 17-`symbol`类型

#### （1）基本数据类型，作为构造函数不完整，不支持`new Symbol()`；

#### （2）创建一个`symbol`；

​	语法：`Symbol([description])` `descrption` 是这个`symbol`的描述符，需要是字符串

```javascript

var sym1 = Symbol();
var sym2 = Symbol('foo');
var sym3 = Symbol('foo');
```

#### （3）常见的`symbol`

##### 	1-`symbol.iterator`:一个返回一个对象默认迭代器的方法。被 `for...of` 使用;

#### 	(4)使用场景:

##### 		(1)定义对象中的特定变量,而不要担心命名会冲突;

#### 	(5)特点:

###### 		(1)不会被`for...in`循环迭代到;`Object.getOwnPropertyNames()`不会返回`symbol`对象的属性;

###### 		(2)可以使用`Object.getOwnPropertySymbols()`读取该对象所有`symbol`;

### 18- `map`的坑

​	1-`map` 可以使用`map[key]`访问吗？

​	 可以，但是不推荐这么使用，因为这样使用的前提是通过 `map[key] = value`赋值。**但这种设置属性的方式不会改变 Map 的数据结构。**它使用的是**通用对象的特性**。`'bla'` **的值未被存储在 Map 中**，无法被查询到。其它的对这一数据的操作也会失败。

```javascript
const wrongMap = new Map();
wrongMap['bla'] = 'blaa';
wrongMap['bla2'] = 'blaaa2';

console.log(wrongMap); // Map { bla: 'blaa', bla2: 'blaaa2' }
wrongMap.has('bla')    // false
wrongMap.delete('bla') // false
console.log(wrongMap)  // Map { bla: 'blaa', bla2: 'blaaa2' }
```

​	2-`map[key] = 123`,与`map.set(key,123)`区别？

​	一个是使用通用对象属性，一个是使用`map`数据结构的属性。

### 19- 如何中止`fetch`请求?

​	通过请求终止对象控制。

​	`fetch`请求函数中，有一个选项`signal`，表示该请求是否终止。

```javascript
 const control = new AbortController();
 const { signal } = control;
 window.fetch(...,{signal});
 control.abort();//终止fetch请求
```

## 20-object.is() 方法

比较两个参数是否为同一个值。1-对符号敏感。2-不会强制类型转化。

```javascript
Object.is(value1, value2);
Object.is(+0,-0);//false
```

Node

### 	1-node 中的事件循环？注意是 setTimeout 不是 setTimerout。

​		分为六个阶段：

#### 		（1）timer 阶段：执行 timer 的回调，即 setTimeout、setInterval 里的回调函数；

#### 		（2）I/O 事件回调阶段（I/O callbacks）：执行上一轮循环中为未执行的 I/O 回调函数；

#### 		（3）闲置阶段（idle,prepare）：系统内部使用；

#### 		（4）轮询阶段（poll）：检索新的 I/O 事件;执行与 I/O 相关的回调。事实上除了其他几个阶段处理的事情，其他几乎所有的异步都在这个阶段处理。

#### 		（5）检查阶段（check）：setImmediate 回调函数在此执行；

#### 		（6）关闭事件回调阶段 (close callback)：一些关闭的回调函数，如：socket.on('close', ...)；

​		除了上面六个阶段之外，还存在 **process.nextTIck**，它不属于上面的阶段，而是 一个阶段到另一个阶段的 **过渡期间过执行**；

​		注意：每一个阶段都有一个自己的 **回调队列（宏任务和微任务）**，当事件循环进入某个阶段时，将会在该阶段内执行回调，**直到队列耗尽或者已经执行最大的回调函数数量**，那么就会进入下一个阶段。

### 	2-node 中的微任务与宏任务？

### 		（1）微任务：process.nextTick,Promise.then,queueMicrotask；

### 		（2）宏任务：

timer queue：setTimeout、 setInterval；

poll queue：IO事件
check queue：setImmediate
close queue：close事件

### 		（3）执行顺序：

​				1-next tick microtask queue；

​				2-other microtask queue；

​				3-timer queue；

​				4-poll queue；

​				5-check queue；

​				6-close queue；

## 	2-setTimeout、setImmediate 执行顺序？

​		两种情况：setTimeout,setImmediate

​						setImmediate,setTimeout

​		原因：遇到 setTimeout，虽然设置的是 0毫秒 触发，但实际上会被强制改成 **1ms**，时间到了然后塞入times阶段。所以这时候如果同步代码的执行 没有超过 1ms，那么到了 timer 阶段会跳过这个定时器；如果超过了 1ms 那么就会执行 timeout；

```javascript
setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});
```

## 3-说说你对 node 中间件理解？

### 1-中间件是什么？

​	中间件是介于 **应用** 和 **系统软件** 之间的一类软件，它使用系统软件提供的基础功能，

作用：衔接网络上应用程序的各个部分或者不同的应用，可以达到 **资源共享**、**功能共享** 的目的。

### 2-node 中的中间件？

​	主要是指 **封装 http 请求细节处理的方法**。例如在 **express、koa** 等 web 框架中，中间件本质作为一个回调函数，参数包括 **request（请求对象）、response（响应对象）、next（执行下一个中间件的函数）**，在中间件函数中，我们可以 **执行业务逻辑代码**，修改请求和响应对象，返回数据等。

### 3-如何去封装一个 中间件？

​	主要就是实现封装的函数，像我们的 express.router 去写 APi，就需要传递几个参数，第一个就我们的 API 地址，后面参数就是 业务处理的 函数，然后这个函数就会接受 三个参数，也就是  **request（请求对象）、response（响应对象）、next（执行下一个中间件的函数）**。

```javascript
var express = require('express');
var router = express.Router();

const {
    getClass,
} = require("../controllers/course");

router.post('/getFreeTime', function (req, res, next) {
    console.log(req.body.className)
    let className = req.body.className
    console.log(className)
    getCourse(className).then(getCourse_result => {
        console.log(getCourse_result)
        res.send({
            error: 0,
            getCourse_result
        })
    })
})

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

### 4-npm install 

#### 	(1)npm install --save:

​		在 npm 5.0.0 之前，我没安装包的时候，不会默认把包添加到依赖项，这个选项就是安包同时把它添加到依赖项；

​		在 npm 5.0.0 后，安包都会默认的添加到依赖项；

#### 	(2)npm install --D:

​		这些包会出现在 **devDependencies** 里面，只会在开发环境使用。

## 事件循环

### 	1-宏任务与微任务有哪些？

#### 		宏任务：setTimeout、setInterval、setImmediate、ajax 请求回调；

#### 		微任务：Promise.then().catch().finally()、process.nextTick()；

### 2-为什么要区分 宏任务 与 微任务？

微任务的执行是优先于宏任务的，这样设计的话，就会给一些紧急的异步任务 **插队的机会**，而不是全部放到 **宏任务队列去排队**。

## webpack

### 1-webpack  是什么？

​	webpack 是一个用于现代 JavaScript 应用程序的 **静态模块-打包工具**，它是 **基于入口式的**，webpack 会从入口开始自动递归解析加载需要的所有资源，不同的文件可以使用不同的 loader 加载，同时也可以使用 plugin 拓展 webpack 的功能，它的出现，能够减轻程序员工作，提高开发效率。能够解决下面的问题：

​		1-我们在开发环境需要使用 JS **的高级特性**，或者说 TS、CSS 预处理器 等，包括我们使用 vue、react 来开发，那么浏览器时无法直接识别这些代码的；

​		2-需要通过模块化的方式来开发，不只是 **JS** 代码需要模块化，**HTML、CSS** 这些资源也都会面临这模块化的问题；

​		3-开发完成后也需要对代码进行压缩、合并等其他相关优化；

​		4-监听代码，热加载；

​	webpack 的能力：

​		1-编译代码能力，能够把开发阶段使用的例如像 ES6+ 的语法转译成 ES5 语法，从而提高开发效率，解决浏览器兼容问题；

​		2-模块整合能力：在生产环境的时候，可以把散落的模块打包到一个 bundle.js，提高可维护性，**解决了浏览器频繁请求模块文件的的问题**；

​		3-万物皆模块的能力：webpack 可以将开发过程中使用的 **样式、图片、字体等资源文件** 都作为模块使用，这样就拥有了一个统一的模块化方案，所有 **资源文件的加载都可以通过代码控制** ，可以与业务代码一同维护，提高项目可维护性；

### 2-webpack 打包流程？

​	webpack 运行流程是一个 **串行过程**，在运行过程中会广播事件，然后对应的插件会监听它关心的事件，介入打包过程。

​	整个过程可以分为三个阶段：

​		1-初始化流程：从 **配置文件和 shell 语句** 中读取与合并参数，并且初始化需要使用的 **插件**，已经配置 **插件执行环境等**。

​		2-编译构建流程：从（entry）入口文件触发，针对每一个 module 调用对应的 Loader，去翻译文件的内容，同时找到 module 依赖的 module 递归的去编译处理；

​		3-输出流程：对编译后的 module 合并成 chunk，把 chunk 转化成文件，输出到操作系统。

### 3-webpack plugin 和 loader 的区别？

​	1-loader：是指文件加载器，能够加载资源文件 例如 **.less、.sass、.png**，并且对这些文件进行处理，例如编译、压缩等，最后一起打包到指定文件中；

​	2-plugin：增强 webpack，能够实现一些原生不支持的功能，例如：打包优化、资源管理、环境变量注入等。

### 4-常见 loader、plugin？

​	1-loader：style-loader（将css添加到DOM的内联样式标签style里）、less-loader（处理 less 文件）、babel-loader（使用 babel 转义 es6+）、html-minify-loader（压缩 html 文件）；

​	2-plugin：CompressionWebpackPlugin（同时输出资源压缩版本）、MinChunksSizePlugin（指定 chunk 文件大小的最小值，合并 chunck）

### 5-什么是 bundle、chunk、module？

​	module：是开发中的单个模块，在 webpack 的世界，一切皆模块，一个模块对应一个文件，webpack 会依据文件的引用生成 chunk；

​	chunk：打包构代码块，一个 chunk 由多个模块组合而成，用于代码的合并和分割；

​	bundle：处理好 chunk 之后就会生成对应的 bundle，一般一个 chunk 对应一个 bundle，是最终输出的，能够直接在浏览器中运行；

### 6-plugin 的原理？

​	webpack 是基于事件流的，运行过程会 广播事件，然后对应的插件会监听它关心的事件，介入打包过程，实现插件系统的基础是 **Tapable**。Tapable 是一个 eventEmit 库，控制钩子函数的订阅与发布。

### 7-loader 原理？

​	loader 就是一个函数，匹配到对应的文件，就使用 loader 去加载文件。loader 的加载是一个串行过程，顺序是从后往前的执行过程。

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

​		路由懒加载使用的是 **webpack 代码分离**，当我们使用路由懒加载时，对应懒加载的组件 会被从最终的 app.js 中抽离出来，形成单独的 js 文件，只有在需要进入这些页面的时候，才会去 加载对应的 文件。

### 	2-图片太多优】化加载？

​		1-图片如果过大，可以压缩图片；

​		2-使用缓存，也可以使用 CDN 加速服务；

​		3-可以使用 专门的 **图片服务器** 管理图片资源；

​		4-图片懒加载、以及虚拟列表；

​		5-雷碧图，小icon合并成一张图片,通过**background-position** 来控制显示icon。减少请求，这些图片资源请求合成一个；

### 	3-虚拟列表实现原理？？

​		只在用户可视区域渲染对应的内容，上部和下部分都渲染空内容占位。对比懒加载方式，性能更好，因为懒加载 **随着加载数据越来越多，浏览器的重排和重绘的开销将会越来越大**。

​		startIndex = Math.floor(scrollTop/itemHeight)；

​		endIndex = startIndex + (clientHeight/itemHeight) - 1；

### 4-为什么 vite 开发环境比 webpack 快？

​		webpack 是先打包，然后启动开发服务器，请求服务器时候，给予打包后的结果。

#### 	快在哪里：

​		（1）vite 是直接启动开发服务器，**不需要进行打包**，也就不需要去分析模块依赖、编译；

​		（2）模块加载时基于浏览器本身支持的 **ES Module**，并且模块编译是 **动态编译** 的过程，只有在使用时候才编译，缩短编译时间；；

​		（3）HRM 热更新方面，当某个模块内容改变时，让浏览器去 **重新请求该模块即可**，而不是像 webpack 重新将该模块的 **所有依赖重新编译**；

## 数据库？

#### 1-`关系型数据库`与`非关系型数据库`：

##### 	(1)关系型数据库：

​		`关系型数据库`指的是使用关系模型（**`二维表格模型`**）来组织数据的数据库。

##### 	优点：

​		（1）支持通用`sql(结构化查询语句)`；

​		（2）复杂操作：可以通过`sql`实现多张表的联动查询；

​		（3）提供事务的支持；

##### 	缺点：

​		（1）由于使用`二维表`这种结构，使得海量数据的读写，效率低下；

​		（2）高并发能力差；

​		（3）数据模型`灵活度低`，就是表这样的结构，无法快速容纳新的数据结构；

###### 	常见关系型数据库：

​		mysql、Oracle；

#### （2）非关系型数据库：

​		`非关系型数据库`是指通常指数据以`对象的形式`存储在数据库中，可以是`键值对、图片、文档`，而对象之间的关系通过每个对象`自身的属性`来决定，常用于存储非结构化的数据。

##### 	优点：

​		（1）格式灵活，储存的数据格式可以是键值对、图片、文档，使用灵活，应用场景广泛；

​		（2）速度快，效率高。 NoSQL 可以使用`硬盘`或者`随机存储器`作为载体，而关系型数据库只能使用硬盘。

​		（3）海量数据容易维护，高并发、高稳定、成本低；

##### 	缺点：

​		（1）不支持`sql`查询，学习使用成本高；

​		（2）不支持`事务`，无法保证数据的完整性和完全性；

​		（3）复杂表单的联动不易实现；

##### 	常见的非关系型数据库：

​		键值对：Redis；文档：MongoDB；

#### 2-什么叫事务？

##### 	事务：事务是由一系列对数据库的操作组成的逻辑单元。

##### 	特点：

##### 	（1）原子性：一次事务操作中，要么所有的操作都成功，要么都失败；	

##### 	（2）一致性：数据库中的数据，总是从一个一致的状态，转化到另一个一致的状态，也就是说在某个时间是A，另一个时间是B，不会是同一个时间不同的人读取到不同的结果。这是由原子性、隔离性、持久性共同保证的结果。

##### 	（3）隔离性：多个并发的事务之间互相隔离，不会影响。隔离性是当多个用户并发访问数据库时，比如操作同一张表时，数据库为每一个用户开启的事务，不能被其他事务的操作所干扰，多个并发事务之间要相互隔离。（实现：1-加锁；2-MVCC多版本并发控制）；

##### 	（4）持久性：持久性是指一个事务一旦被提交了，那么对数据库中的数据的改变就是永久性的。

#### 3-多个线程同时操作一个表怎么办，也就是事务的隔离性？

##### 	1-加锁：

##### 	2-MCVV多版本并发控制：????????

#### 4-数据库的三大范式？

##### 	（1）第一范式：表中的所有属性，不能够在分解成列；

##### 	（2）第二范式：首先满足第一范式，然后表中所有非`主键`，都`完全依赖主键`；完全依赖主键是指，如果有多个主键，其他属性不是依赖多个主键中的某一些；

##### 	（3）第三范式：首先满足第二范式，然后非主键直接依赖主键；而不是`主键-->属性A，属性A-->属性B`；例如：学号，课程号，教师名；

#### 5-数据库索引？

##### 作用：使得我们可以快速的访问数据库中的数据。

##### 索引数据结构：`B+树`

# 操作系统

## 1-线程与进程的区别？

### 	本质区别

​		进程：进程是正在运行的程序的一个抽象，是系统进行 **资源分配** 以及 **调度** 的基本单位。

​		线程：任务 **调度** 和 **执行** 的基本单位 。

### 	开销方面：

​		进程：每个进程都有自己独立的 **代码和数据空间（程序上下文）**，程序直接切换会有比较大的开销；

​		线程：线程可以看做轻量级的进程，同一类线程 **共享代码和数据空间**，每个线程都有自己独立的运行栈和程序计数器（PC），线程之间切换的开销小；

### 	所处环境：

​		进程：操作系统中可以存在多个进程；而一个进程中可以有多个线程同时执行；

### 	内存分配：

​		操作系统运行的时候，会给每一个进程分配不同的 **内存空间**；除了CPU外，系统不会为线程分配内存（线程所使用的资源来自其 **所属进程** 的资源）；

## 2-硬盘和随机存储器？

​	

# TypeScript

## 1-说说你对 TypeScript 的理解？

​	TypeScript 是 JavaScript 的 **超集**，支持面向对象的概念，如类、接口、继承、泛型等。支持 **静态类型检查**，能够在代码编译阶段就检查出数据类型的错误。

### 	特性：

​	（1）类型批注和编译时类型检查；

​	（2）类型推断：ts 中如果没有给定类型，会自动推断变量类型；

​	（3）接口：定义对象类型；

​	（4）泛型编程：写代码时使用之后才指定类型；

​	。。。。。。

## 2- 什么是枚举类型？

​	枚举就是一个对象所有可能的值的集合。通过 **enum** 关键字定义。

​	三种类型：数字枚举、字符串枚举、异构枚举

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

### 应用场景

​	就拿回生活的例子，后端返回的字段使用 0 - 6 标记对应的日期，这时候就可以使用枚举可提高代码可读性，如下：

```typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```

## 3-说一说对接口的理解？

​	TypeScript 一大特性是对具体的结构进行类型检查，接口的作用就是 **定义、命名** 这些结构，然后可以进行 **类型批注**。接口也是可以进行 **继承** 的。

```typescript
// 先定义一个接口
interface IUser {
  name: string;
  age: number;
}
const getUserInfo = (user: IUser): string => {
  return `name: ${user.name}, age: ${user.age}`;
};
// 正确的调用
getUserInfo({name: "koala", age: 18});
```

## 4-说说你对泛型的理解？

​	泛型允许我们编写代码在使用的时候再 **指定类型** 的特性，比如定义 函数、接口、类的时候。

例子：比如有一个函数，输入的参数 value 可以是任何类型，但是返回值为一个数组，数组元素的类型和 value 类型一致，那么我们这里就可以使用 **泛型批注 value **，同时返回值类型也是 泛型的数组。

```typescript
function creatArray<T>(length: number, value: T): Array<T> {
  let result: Array<T> = []
  for (let i = 0; i < length; i++) {
    result.push(value)
  }
  return result
}
console.log(creatArray(1, 'x'))
```

# 代码托管 git

## 1-git merge 和 git rebase 的区别？

​	它们两个有着同样的作用，都是将一个分支的提交合并到另一个分支上去。

### 	git merge：

​	会合并 **共同的祖先、各自最新的提交**，然后将修改的内容 **生成一次新的提交**。

### 	git rebase：

​	如果在 master 上 git rebase dev，会从两个共同的祖先开始 **提取 master 分支的修改**，然后在目标分支上 **重复的提交 master 上新的提交**。**会舍弃掉当前分支的提交**

# 说一说 JWT？

### 1-JWT(JSON Web Token) 鉴权是什么？

	JWT 本质上一种 字符串书写规范，是用来在用户与服务器之间传递安全可靠的信息。现在的前后端分离项目中，我们就会使用 这种方式去鉴权。

#### 实现鉴权过程：

	*服务器当验证用户账号和密码正确的时候，给用户颁发一个令牌（Token），这个令牌作为后续用户访问一些接口的凭证；
	
	*后续访问会根据这个令牌判断用户时候有权限进行访问；

#### Token

	token 分为三部分 **Header(头部)、载荷（Payload）、签名（Signature)**，并以**`.`**进行拼接。其中头部和载荷都是以**`JSON`**格式存放数据，只是进行了编码。

##### 	header：主要声明使用的算法；

##### 	payload：这里会存放实际的内容，Token 携带数据；

##### Signature：签名是依据头部和载荷进行的加密，只要密钥没有泄露，如果前面两个部分内容被更改，服务端通过 头部、载荷 获得的签名将会和 传过来的 Signature 不一致；

#### Token 的类型？

