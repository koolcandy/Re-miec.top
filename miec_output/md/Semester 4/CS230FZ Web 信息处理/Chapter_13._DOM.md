# Chapter 13. DOM

DOM 是 Document Object Model 的缩写。DOM 是 W3C 指定的用于访问文档的标准，由三个不同的部分：

*   Core DOM
*   XML DOM
*   **HTML DOM**

HTML DOM 模型可以用对象树表示：

![DOM Tree](https://s2.loli.net/2023/06/19/si9bH1T4nfVOdc3.png)

有了这个 DOM 模型，JS 就可以创建动态的 HTML 文件：改变元素、改变属性、改变 CSS、删除元素、添加属性等。

## HTML DOM Methods

HTML DOM 的 property 是可以改变的属性值。DOM 编程接口可以调用 DOM 的方法，比如 JS 等语言。

在 DOM 当中，所有的 HTML 的元素都被当作一个对象。

### 改变元素

*   `element.innerHTML = xxx`，顾名思义
*   `element.attribute = xxx`，顾名思义
*   `element.style.property = xxx`，顾名思义
*   `element.setAttribute(attribute, value)`，顾名思义

### 添加或删除元素

*   `element.createElement(ele)`
*   `element.removeChild(ele)`
*   `element.appendChild(ele)`
*   `element.replaceChild(new, old)`
*   `element.write(text)`，其实相当于改变了 HTML 文件

### `document` 的属性

*   `document.anchors`
*   `document.body`
*   `document.documentElement`
*   `document.embeds`
*   `document.forms`
*   `document.head`
*   `document.images`
*   `document.links`
*   `document.scripts`
*   `document.title`

比如说，要查找一个 HTML 当中的表单，可以不用 `getElementByxxx`，直接 `document.forms["myForm"]["fname"]`，就可以定位到指定表单当中的指定输入框：

![Form Example](https://s2.loli.net/2023/06/19/JjC7kMvLE8cUTpu.png)

## DOM 事件

*   click 事件
*   页面 loaded 事件（用于判断 cookie 是否存在等）
*   图片 loaded 事件
*   鼠标移动事件
*   输入框变化事件
*   表单提交事件
*   键盘按键事件

### `onload` 与 `onunload`

一个是进入这个页面，一个是离开这个页面。

### 事件监听器 event listener

`addEventListener(event, func, useCapture=false)`

```javascript
document.getElementById('xxx').addEventListener('click', fun);  // 相当于 onclick="fun"
function fun() { /* blabla */ }
```

#### bubbling 还是 capture？

第三个参数表示是用冒泡的方式还是捕获的方式。bubbling 是在元素本身触发，然后向上传播到根元素；capture 是在根元素触发，向下传播到实际触发这个事件元素。

默认的方式是 bubbling，优点在于可以使用一个单一的事件处理句柄，处理多个元素相同的事件（可以共用），而 capture 方式可以在事件到达目标元素之前，取消一个事件的传播，也就是说可以更好地控制元素要不要响应这个事件。

举个例子。

```html
<div id="outer">
   <div id="inner">
   </div>
</div>
<script>
  const outer = document.querySelector('#outer');
  const inner = document.querySelector('#inner');
  outer.addEventListener('click', () => {
      console.log('Outer clicked');
  });
  inner.addEventListener('click', () => {
      console.log('Inner clicked');
  });
</script>
```

这时候如果在 inner 元素点了一下，就会先后触发 inner 和 outer 的事件处理函数，即输出：

```text
Inner clicked
Outer clicked
```

如果是指定了 capture 的方式：

```javascript
outer.addEventListener('click', () => {
  console.log('Outer clicked');
}, true);
inner.addEventListener('click', () => {
  console.log('Inner clicked');
}, true);
```

那么点 inner 的时候，就会先触发父节点的事件，再触发自己的，即输出：

```text
Outer clicked
Inner clicked
```

#### 添加多个事件处理

一个元素可以添加多个同类型的事件处理句柄

![Multiple Event Handlers](https://s2.loli.net/2023/06/19/fWCbgaG5e2xUo8m.png)

也可以添加多个不同类型的

![Different Event Handlers](https://s2.loli.net/2023/06/19/Oi6uahmXYrwEBR1.png)

#### 移除

```javascript
// 移除 mousemove 事件对应的 myfunc 处理句柄，不移除 mousemove 的其他的处理句柄
document.getElementById('xxx').removeEventListener("mousemove", myfunc);
```

## DOM Navigation

![DOM Tree](https://s2.loli.net/2023/06/19/si9bH1T4nfVOdc3.png)

这棵树当中的所有元素都可以看作一个节点，节点分为 text node 和 attr node，甚至也还有 comment node

剩下的内容没讲。
