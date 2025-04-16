
Chapter 11\. JS Part1（引用方式、显示信息、修改元素、语法类型）
==========================================


引用 js 代码或文件
-----------


### 内部 js 代码


直接用 `<script>` 包含代码



```javascript
<script>
// js code here
</script>

```

### 外部 js 文件


* 可以被多个网页复用。
* 与 html 分离开，让 js 易于维护
* 可以在第一次加载的时候被缓存，那么以后再加载就可以变得更快


引用方法是，在 `<head>` 或 `<body>` 当中加上这一行：



```html
<script src="myJs.js"></script>

```

显示信息
----


* `window.alert()`，弹窗
* `document.write()`，输出信息到 HTML 文档
* `innerHTML`，修改元素的 HTML 值
* `console.log()`，输出到控制台


### 关于 `document.write()`


如果是直接嵌入在 `<script>` 里面，那么，会跟随文档其他内容一同加载出来。


![](https://s2.loli.net/2023/05/29/NI3l5JCfoKF7nyp.png)


但是，如果是文档加载完毕后，再执行一遍 `document.write()`，那么，文档会被先清空，然后写入数据！


![](https://s2.loli.net/2023/05/29/cE1u5zXiMTFpvnk.png)


修改元素
----


### 修改属性：`ele.attr`


例：修改图片源



```javascript
var img = document.getElementById("myImage");
img.src = "haha.jpg";  // img.src 就是这个元素的 src 属性，直接改就行了

```

### 修改样式：`ele.style.property`


例：修改颜色



```javascript
var txt = document.getElementById("demo");
txt.style.color = "red";  // txt.style.xxx 就是样式

```

数据检验
----


* `isNaN()` 判断是否不是数字


JS 语法和习惯
--------


* 注释用 `//` 或 `/**/`
* identifiers，也就是各种名字，必须是 `$` 或 `_` 或字母打头，后面只能是数字或字母或下划线或 `$`
* 习惯上使用小写字母打头的驼峰命名
* 语句之间用分号（semicolon）分隔
* 习惯上，一行代码不超过 80 字符
* 顺带一提，JavaScript 使用 Unicode 字符集
* js **有一个比较新颖的关键字，叫做 `debugger`，作用是暂停 JS 代码的执行，调用 debugging 函数（如果有）**
* 关于 js 的运算符优先级，本来 ppt 里面是有的，但是被老师删了，说以新的为准，那应该不会考
* 函数的格式是 `function name(para1, para2, ...) {}`


JS 的类型
------


* 关于 `undefined`，就是定义了但是没有赋值的变量。
* **如果先执行了 `var a = 123;` 然后又执行了一次 `var a;`，那么 `a` 的值还是 `123`，不会变**
* 关于字符串跟数字的拼接：`16+4+"hahaha"` 的值是 `20hahaha`；而 `"hahaha"+16+4` 的值是 `hahaha164`。综上：从左到右做加法运算
* **js 当中有一个符号是 `===`，三个等于号，要求值和数据类型都一样；还有一个 `!==`，`a !== b` 为真，当且仅当二者值不同或类型不同满足其一**
* js 当中一个变量 `x` 类型是可以变的（dynamic），可以一开始是个数字，后来变成了字符串，类似 python，换句话说 js 是弱类型的。另外，定义变量的时候不需要指定类型。


### JS 的数组



```javascript
var arr = [1, 2, 3, 4, 5];

```

注意数组（array）也是对象的一种。所以对数组类型使用 `typeof`，返回的结果是 `object` 而不是 `array`.


### JS 的 Object


类似于结构体实例，也类似于字典，键值对的写法是 `name:value`。


除了变量，Object 里面也可以存一个函数：`funName: function() {}`。函数中用 `this.xxx` 访问自身成员。函数的调用方法是 `funName();`。如果没有加括号，就不是函数调用，而是访问这个函数的定义值。



```javascript
var person = {
  firstname: "John",
  lastname: "Doe",
  age : 50,
  eyeColor: "blue",
  fullName : function() { return this.firstname + " " + this.lastname; }
};

```

访问属性的方法有两种：


* 像结构体一样，`.` 运算符，如 `person.age`
* 像字典一样，用方括号，如 `person['age']`


如果一个对象不需要使用了，可以赋值为 `null`。这只是清除掉对象的值，如果调用 `typeOf`，仍然会返回 `object` 而不是 `undefined`


`new String()`，`new Number()`，`new Boolean()`，这些也都会返回一个对象。但是这些简单的数据类型，考虑到效率问题，一般不会定义成对象。


#### `null` 与 `undefined` 的关系


一图胜千言


![](https://s2.loli.net/2023/05/29/dU3vJGYcWAHmPa7.png)


### `typeof` 运算符


`typeof <varible>` 的值就是字符串形式的变量类型名称。


对于值为 `undefined` 的变量使用 `typeOf`，得到的结果仍然是 `undefined`.


### `instanceOf` 运算符


用法跟 `typeOf` 类似。返回的是对象的具体类型。


