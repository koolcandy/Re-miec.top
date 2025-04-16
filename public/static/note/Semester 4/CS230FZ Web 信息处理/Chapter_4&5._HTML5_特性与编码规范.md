
Chapter 4\&5\. HTML5 特性与编码规范
============================


文件类型和字符集
--------


这两样的定义变简单了。只需要



```html
<!DOCTYPE HTML>
<meta charset="UTF-8">

```

新元素
---


### 语义与结构相关


用 `<div>` 和 `<span>`，虽然可以搞出结构化页面，但是不知道这个结构里面是什么东西。语义相关元素可以让页面的格式与组织结构更加规范。


![](https://s2.loli.net/2023/03/27/aJKO1PeMEDUirCY.png)


![](https://s2.loli.net/2023/03/27/H2Y7dIM8guX9ltN.png)
![](https://s2.loli.net/2023/03/27/ailpeU7bLXsVJGc.png)


* `<section>`，开闭之间表示一个章节部分，显示格式上没有什么特征，但是源代码结构很清晰
* `<article>`，类似 `<section>`，开闭之间表示文章。语义上，`<article>` 之间可以嵌套 `<section>`，`<section>` 当中也可以嵌套 `<article>`，它俩没有严格的谁大谁小的关系。


### 表单相关


![](https://s2.loli.net/2023/03/27/ipmQcFwnI2KOLx8.png)
![](https://s2.loli.net/2023/03/27/k8AneYr6fLFTwUK.png)


### 图像与音视频相关


![](https://s2.loli.net/2023/03/27/VIJX1NUkRo29pEW.png)
![](https://s2.loli.net/2023/03/27/zP5efC1i8a2Ubmu.png)


新 API
-----


地理位置的、拖动、本地存储、缓存、Web Worker、SSE


移除的与被代替的元素
----------


![](https://s2.loli.net/2023/03/27/w25q9m4C71uIacs.png)


**PPT 的 22 到 34 页没讲**


HTML5 的 Canvas（画布）
------------------


顾名思义，用来画画的。然而，`<canvas>` 只是画布（容器），但是画布里面到底有什么，通常是通过结合 JavaScript 来控制的。


记得指定 id，这样方便 js 去找。


默认情况下，一块画布是空的矩形，没有边框。如果想要边框，可以 CSS 给他指定。



```html
<canvas id="myCanvas" width="200" height="200" style="border:1px solid black;"></canvas>

```


```javascript
// 绘制一个红色矩形
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");  // 表示是 2D 设备上下文（屏幕）的绘制
ctx.fillStyle = "#f00";        // 红色
ctx.fillRect(0, 0, 150, 75);   // 参数是矩形左上角的坐标及其 w, h

```


```javascript
// 绘制一条黑色实线
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);          // 指定了绘制的操作
ctx.stroke();                  // stroke 是画笔的意思，表示执行绘制操作，画出线段

```


```javascript
// 绘制一条绿色的 L 形状
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();            // 告诉设备，现在要新绘制的是一条「路径」
ctx.moveTo(20, 20);
ctx.lineTo(20, 100);        // 路径第一段，竖着的
ctx.lineTo(70, 100);        // 第二段，横着的
ctx.strokeStyle = "green";  // 指定颜色
ctx.stroke();

```


```javascript
// 绘制一个四分之三圆
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
// 指定画一条弧的操作，前两个参数是圆心坐标，然后是半径
// 最后两个单位是以弧度（RAD）为单位的起始值、终止值（0~270°）
// 还有一个可选参数 counterclockwise（表示逆时针），默认取值 false，即默认顺时针
ctx.arc(100, 75, 50, 0, 1.5 * Math.PI);
ctx.stroke();  // 执行画弧操作（只是一圈）
// 如果想要画实心圆，可以指定 ctx.fillStyle 之后再 ctx.fill();

```


```javascript
// 写字
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.font = "30px Arial";              // 指定字号字体
// 四个参数，文字，起始坐标，最大宽度（可选）
ctx.fillText("Hello world", 10, 50);    // 实心文字
ctx.strokeText("Hello world", 100, 150);  // 空心浮雕文字
// 无需 stroke() 操作

```


```javascript
// 画图
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("its_id");
ctx.drawImage(img, 10, 10);  // 需要参数一个图片对象

```

HTML5 的多媒体
----------


### 视频


HTML5 之前只能通过 flash 等插件播放视频。


HTML5 可以直接通过 `<video>` 标签来嵌入一个视频，浏览器提供通用的播放方式：



```html
<video width="" height="" controls>
  <source src="v.mp4" type="video/mp4">
  <source src="v.ogg" type="video/ogg">
  <source src="v.webm" type="video/webm">
  <!-- 自动选择第一个支持的格式播放，如果都不支持，显示文本 -->
  does not support the video.
</video>

```

其中，`control` 属性的作用是，允许用户控制视频的播放、暂停、音量等状态。


可以使用 `autoplay` 属性指定加载时自动播放（需要浏览器支持）


#### DOM 事件


播放、暂停等事件发生，都会有 DOM 事件。


### 音频


同视频，HTML5 之前没有通用的播放标准。


音频与视频几乎一模一样，只是 `<video>` 换成了 `<audio>`。


HTML5 的地理位置 API
---------------


当用户授权后，即可以通过 API 获取用户的地理位置。需要配合 JS。



```javascript
function getLocation() {
  if (navigator.geolocation) { // 检查是否支持地理位置 API
    // 两个回调函数作为参数，第一个用来显示坐标，第二个用来显示错误信息
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("不支持");
  }
}
function showPosition(position) { // 回调函数
  console.log("Latitude: " + position.coords.latitude);
  console.log("Longitude: " + position.coords.longitude);
}

function showError(error) {
  switch (error.code) {
    // blabla
  }
}

```

关于 `getCurrentPosition()` 的返回内容（精度、海拔、朝向、速度、时间戳等）的更详细信息：


![](https://s2.loli.net/2023/04/10/UXBDQxVswAr6FEz.png)


此外还有一个叫做 `watchPosition()` 的东西，用于持续获取位置信息（监听轨迹）。当不再需要监听，用 `clearWatch()` 停止。


HTML5 的拖动（Drag\&Drop）
---------------------


也需要配合 JS。


拖拽需要若干个步骤，下面进行详细解释


### 1\. 要设置元素为「draggable」


方法是，在标签中，将 `draggable` 属性设置为 `true`；同时记得设置 id 方便 js 代码对应：



```html
<img id="drag1" src="smiley.gif" draggable="true">

```

### 2\. 从哪里拖


要设置被拖拽元素的 `ondragstart` 属性（通常是个函数），表示



```html
<img id="drag1" src="smiley.gif" draggable="true" ondragstart="drag(event)">

```

此外，在调用的函数中，通过 `dataTransfer.setData()` 设置被拖拽的数据类型和数据值



```javascript
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

```

### 3\. 拖到哪里


设置目标位置元素的 `ondragover` 属性，先允许接收



```html
<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

```


```javascript
function allowDrop(ev) {
  ev.preventDefault();
}

```

其中，`preventDefault()` 用于组织浏览器默认策略（默认不允许拖拽）。然后设置拖完做什么：



```javascript
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
  // ev.target 是目标元素
}

```

### 4\. 成品代码


![](https://s2.loli.net/2023/04/10/AhgDbZzQBkpNL6w.png)
![](https://s2.loli.net/2023/04/10/Qoe8gYACnpkSDKy.png)


HTML5 的本地存储
-----------


HTML5 之前基本只能是 cookie 存储信息。但是这不安全，因为 cookie 要跟服务器传来传去的，所以存储的信息量也不可能大。


每个 origin（每个 domain 和 protocol）的页面，都可以存储和访问相同的数据。


HTML 提供了两个对象，用于存储数据：


* `window.localStorage`，**永久** 存储数据
* `window.sessionStorge`，每个会话都独立，会话结束即标签页关闭后数据就会丢失


它们用键值对（`getItem` 与 `setItem`）来读写。存储的形式是 **字符串**。所以如果存储的是数字，要进行类型转换才能进行加减乘除之类的运算。


使用这两个对象前，要用 js 检查一下浏览器是否支持



```javascript
if (typeof(Storage) !== "undefined") {
  // 支持，进行处理
  localStorage.setItem("lastname", "smith"); // 存
  console.log(localStorage.getItem("lastname")); // 取

  // 这样也可以
  localStorage.lastname = "smith"; // 存
  console.log(localStorage.lastname); // 取

  localStorage.removeItem("lastname"); // 删掉

  // 注意类型转换，否则就是字符串拼接了
  localStorage.count = parseInt(localStorage.count) + 1; // 改
} else {
  console.log("不支持");
}

```

HTML5 的 Web Worker
------------------


WW 说白了就是后台运行的一个脚本线程。


因为 JS 运行的时候，页面是不会进行响应的（卡住），所以如果有复杂的代码要执行，就最好设置成 web worker。


首先用 JS 检查是否支持 WW，如果支持就创建一个 WW 对象。



```javascript
var w;
function startWorker() {
  if (typeof(Worker) !== "undefined") {
    // 支持
    if (typeof(w) == "undefined") {
      // 不存在 worker 对象，建一个新的
      w = new Worker("demo_worker.js"); // 外部脚本
    }
    w.onMessage = function(event) {
      // 定义事件响应函数
      console.log(event.data); // event.data 就是接收的数据
    }
  } else {
    console.log("不支持");
  }
}
function stopWorker() {
  // 就算外部脚本执行完了，ww 也一直会监听有没有消息传来
  // 因此要记得终止掉这个 ww，并重置掉
  w.terminate();
  w = undefined;
}

```


```javascript
// demo_worker.js
var i = 0;
function timedCount() {
  i += 1;
  postMessage(i);  // 把 i 作为 event.data 发送
  setTimeout("timedCount()", 500);
}
timedCount();

```

### WW 与 DOM


由于 WW 调用的是外部脚本，所以无法访问部分对象（`window`、`document` 等）。因此 WW 存在一定缺陷。


HTML4 到 HTML5 的迁移
-----------------


### 语义元素


HTML4 当中有一些约定成俗的写法（`<div>` 配合 `id`），在 HTML5 当中有了对应的标签元素。对应的 CSS 替换也类似。


![](https://s2.loli.net/2023/04/03/tnV84edX7QfqPpA.png)


### 元数据


HTML4 当中的 doctype 与编码定义很繁琐：



```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

```

到 HTML5 仅仅是两行：



```html
<!DOCTYPE html>
<meta charset="utf-8">

```

HTML5 的代码风格与惯例
--------------


有些场合下，需要用 XML 解析器（对编码更严格）来解析 HTML。因此，使用更接近 XML 的严格语法，是更明智的、更好的习惯。


### 无论如何都要声明文件类型



```html
<!DOCTYPE html>
<!doctype html>

```

两种写法均可


### 始终使用小写名称


HTML5 允许混用大小写，但是这不好。应当：


* 不应混用大小写
* XHTML 当中都是小写的
* 小写的看起来更简洁（看大写的反应时间会比看小写慢）
* 小写的写起来也方便（不需要一直按住 shift 键）


不管是标签还是属性，都应当保持小写。


#### 文件名也要小写


大部分服务器（Apache 等）对于文件名都是大小写敏感的。但是也有的服务器（IIS 等）大小写不敏感。


因此如果混用大小写，就要非常严格的检查。为了避免不必要的麻烦，应当统一使用小写的文件名。


### 要把所有元素都关闭掉


比如这样子，虽然能给 HTML5 解析器解析出来，但是很不好



```html
<section>
<p>hahaha
<p>hahaha
</section>

```

上述未关闭的写法是不能被 XML 解析器解析的。应当改成



```html
<section>
<p>hahaha</p>
<p>hahaha</p>
</section>

```

甚至，没有 closing tag 的标签也应当关闭，以符合严格的 XML 规范，比如：



```html
<meta charset="utf-8" />
<br />
<hr />

```

### 正确使用引号


HTML5 是允许属性值不加（双）引号的。但是，应当尽量使用，因为：


* 如果属性值当中含有空格，必须使用引号，比如 `class` 属性经常带空格，就必须有引号
* 使用引号可以让属性名和属性值易于区分
* 如果有的用了引号，有的没用引号，那太丑了


### 对于图片


应当一定要记得使用 `alt` 属性，万一图片无法显示，可以让浏览器显示提示信息。


同时，应当一定要记得指定图片大小（宽度高度）。否则，图像在加载成功前，可能是原始大小，其他元素加载完成后，浏览器可能会闪一下（flicker）这张图的尺寸，调整显示效果。


### 关于空格


很多语言当中，等号 `=` 左右两边都提倡有空格。但是，HTML5 当中，尽量不要加空格，空格少可以让代码更加清晰易读：



```html
<link rel = "stylesheet" href = "style.css">
<link rel="stylesheet" href="style.css">

```

### 避免一行太长


由于一些上古编辑器，左右显示宽度是 80，且不方便左右滚动，所以应当尽量避免一行字符多于 80\.


不过现代编辑器一般都不会这么傻。所以这不是强制性的。


### 空行与缩进（indent）问题


* 不要随便加空行，也不要随便加缩进，比如两个小代码块之间，两个同级 `<input>` 之间，无需空行，无需缩进
* 对于逻辑意义上有差异的代码段，中间可以加上空行，保持代码结构清晰
* 为了可读性，不要用 TAB 进行缩进，用 2\-spaces 会更好


像这样，这么多空行空格，就很没有必要（尤其是文字当中的空行空格，根本没用）。虽然他长得很像是符合 markdown 规范，但是在 HTML 里面就是不好。


![](https://s2.loli.net/2023/04/03/DKLqpWT4JtumHiQ.png)


应当改成


![](https://s2.loli.net/2023/04/03/hrx9fF7J4NEKezA.png)


### 不要忽略 `<html>` 与 `<body>` 等


HTML5 允许忽略 `<html>` 与 `<body>` 和 `<head>`。但是不推荐。因为这可能导致部分浏览器异常显示，以及可能会让 XML 解析器崩溃。


此外，`<html>` 标签当中可以用 `lang` 属性指定语言。比如：`<html lang="en-US">`。这对于屏幕阅读器和搜索引擎比较有意义。


### 关于注释


比较短的注释写在一行以内就可以了：`<!-- 记得注释两头有空格 -->`；比较长的注释建议这样：



```html
<!--
  2-spaces indent
  blabla blabla
  blabla blabla
  blabla blabla
-->

```

