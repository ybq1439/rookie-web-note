## 什么是 BFC（**Block Formatting Context**）？

​	简单总结：块级格式上下文 **BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响**

## 布局规则

​	1-内部的 box 会在垂直方向上一个一个放置；

​	2-子元素在垂直方向上的距离会由 margin 决定。并且相邻的子元素的 margin 会重叠；

​	3-子元素左边框总会挨着父元素；

​	4-浮动元素也会包含进 父元素；

## 使用场景

​	1-解决 子元素 margin 穿透父元素问题，也就是使得 margin-top 以及 margin-bottom 不会影响到父元素;

​	2-浮动元素使得 父元素 高度塌陷；原理：计算BFC的高度时，浮动子元素也参与计算；

​	3-非浮动元素被浮动元素覆盖；非浮动元素开启 BFC；原理：BFC不会被 float 覆盖；

​	4-两栏布局：原理：BFC不会被 float 覆盖；

## 触发 BFC 条件

​	1-根元素、 Body；

​	2-float：left、right；

​	3-overflow：hidden 或者 auto 或者 scroll；

​	4-position：fixed、absolute；

​	5-display：**inline-block**、**flex** 或者 inline-flex,**table-cell**,table-caption或者inline-table；

## IFC （inline formatting context）

​	行级格式上下文。

## 触发 IFC 条件

​	块元素中仅仅包含内联级别元素。

## IFC 布局规则

​	1-子元素横向排列，并且起点为父元素顶部；

​	2-子元素垂直方向上的样式不会被计算；

​	3-垂直方向上，子元素通过 vertical-align 来对齐；

​	4-把一行上的框框 都包括进去的矩形区域称为改行的 行距（line-box）。行距的宽由包含块和其中的浮动决定；

​	5-line-box 高度由 css 行高计算确定，同一个 IFC 下的 Line-box 高度可能不同；

​	6-当 inline boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定；

​	7-当一个inline box超过父元素的宽度时，它会被分割成多个boxes，这些boxes分布在多个line box中。如果子元素未设置强制换行的情况下，inline box将不可被分割，将会溢出父元素；

## 	行内元素与块元素的区别

### 	块元素：

​	1-换行；

​	2-高度、宽度、margin、padding 都是可控的；

​	3-宽度没有设置时，默认为 auto；

**常见块元素：** **div、p、h1~h6**、**HTML5新增的header、section、aside、footer**。

​	

## 	行内元素：

​	1-不换行；

​	2-高度宽度不可控，由内容决定。但是可以设置 margin、padding、border；

**常见行内元素**：span,a,button

## 解决行内元素之间出现空隙问题

​	出现原因：编辑器格式化时，换行、缩进，在行内元素中，都会产生空白；

​	1-父元素设置 font-size : 0 ；

