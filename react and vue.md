## 1.说一说 vue,react 的区别，异同点？

### 相同点：

#### 	1-数据驱动视图；

#### 	2-组件化；

#### 	3-都使用 Virtual DOM;

### 区别：

#### 	1-核心思想不同：

​		vue 使用 **MVVM** 的模型，**天然支持双向数据流**，react 推崇 **单向数据流**，是 **view=fn(state)** 的模型，如果需要双向需要手动的去实现。

#### 	2-组件写法的差别：

​		vue 写法是 使用 **template** 的单文件组件格式， HTML、CSS、JS 都写在一个 .vue 文件中；	

​		react 做法是 **JSX+inline style**，会把 HTML、CSS 都写在 **JSX** 文件里面，也就是 **all in js **。

#### 	3-diff 算法核心实现不同：

​		**updateChildren** 是 VUE diff 核心，采用双指针的方式实现。在新旧节点的首尾都有指针，两对指针。第一步 进行四种比较：1-新旧 首指针、2-新旧 尾指针、3-新首指针与旧的尾指针、4-新的尾指针与旧的首指针；**查找是否存在相同的可以复用的节点**，这个过程中如果找到了，就会 **移动节点，并且指针向中间靠拢**。

​		如果上面四种情况都不满足，就通过 key 值找可以复用的节点。（**去对比 key 值****，看旧节点中是否存在 **key === newStartNode** 的 key，找到移动 旧节点 到 新节点 start 位置。）如果还是没有找到，**说明是新建的节点了**。

​		react diff 算法分为三个层级：

​		tree 层级：只会同层级比较，不会跨层级比较，并且只会有 **删除和新建操作**，不会去移动节点。

​		component 层级：也是只有 **删除和新建操作**，如果同类组件就会继续往下 diff，如果不是同类组件，直接删掉这个组件，包括子节点，然后新建。

​		element 层级：对于同一层的节点们而言，**第一步是去遍历 新节点集合**，这个过程有三种操作：**插入、移动、删除**，通过 **三个指针** 来实现，oldIndex、index（新节点集合当前位置）、maxIndex（新节点集合访问过程中，旧节点集合对应节点出现的最大的位置）。

​		操作过程只会比较 **oldIndex 和 maxIndex**:

​			1-maxIndex < oldIndex：maIndex = oldIndex;

​			2-maxIndex === oldIndex：no action;

​			3-maxIndex > oldIndex：oldIndex Element move to Index Element；

​	**第二步**： 当节点比较完成后，`diff`过程还没完，还会整体遍历老集合中节点，看有没有 **没用到的节点**，有的话，**就删除**。

#### 	4-响应式原理不同：

​		vue：vue 中通过 **数据劫持** 以及 **发布订阅者模式** 实现；

​		react：使用 setState 方法会触发 render，重新渲染 UI；