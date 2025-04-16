
Lecture 1\. HTML Part1（标签、CSS、格式化、引用）
=====================================


标签 Tag
------


* `DOCTYPE` 声明，定义了文档类型。`<!DOCTYPE html>` 表示告诉浏览器这个文件是 HTML5 文档。大小写不敏感。如果是 HTML 4\.01 或其他版本，要麻烦一些。
* `<head>` 当中的内容不会在页面中显示出来。描述文档信息。
	+ `<title>` 描述页面标题
	+ `<meta>` 描述页面编码，如 `<meta charset="UTF-8">`
	+ `<style>` 用来指定页面内部的 CSS
	+ `<link>` 用来指定页面外部的 CSS
* `<body>` 是 visible 的内容。
	+ `<h1>` 表示一级标题。最小是六级标题。
	+ `<p>` 表示段落。不同段落之间会有一些空白（margin）。这个 margin 的属性可以通过 CSS 修改。
	+ `<a>` 表示链接，其中 `href`（Hyper REFerence）是该标签的最重要属性。而 `target` 属性可以定义打开的动作。它的取值分别表示
		- `_self` 默认动作，当且页面跳转
		- `_blank` 新窗口打开
		- `_parent` 在父框架中打开
		- `_top` 在这个页面的最上级框架中打开，不常用
	+ `<img>` 表示图片。属性 `src` 指定源文件路径，`alt` 表示替换文本（alternative text），也就是图片无法正常显示（比如 404 了）的时候用来替换的文本（可以被屏幕阅读器阅读，方便盲人），`width` 和 `height` 顾名思义。


大部分标签都是一对，前一个叫 opening tag，后一个叫 closing tag。


在某些浏览器当中，如果有一些标签（比如 `<p>`）忘了结束，仍然能成功解析出来（自动添加上）。但有风险，所以还是要记得自己加上。


元素 Element
----------


元素就是从 start tag 到 end tag 之间的所有内容。


### 空元素 empty element


空元素就是没有内容的东西。像换行 `<br>`，分割线 `<hr>` 就是空元素。换行也可以写 `<br />` 或者 `<br/>`，否则无法被 XML 解析器解析，但 HTML5 可以正常解析。


属性 Attributes
-------------


属性提供元素的额外信息，以名值对的形式写在 start tag 里：`name="value"`.


* `lang` 是 `<html>` 的属性，描述文档的语言。比如 `<html lang="en">` 表示这个文档是英文。这个主要是用来告知搜索引擎、屏幕阅读器。
* `<p>` 甚至是普通文字，可以拥有 `title` 属性。鼠标移动到段落文字上，会有悬浮条（tooltip)显示出来，显示 `title` 属性的文本。


通常属性值都是写在双引号里面的。有时候遇到包含双引号文本的属性值，那么就写单引号里面。


HTML 标签、属性啥的都是大小写不敏感的。但是 XHTML 之类的地方都需要小写，所以一般来讲也都用小写。


显示
--


* 不同的窗口大小可能导致不同的显示效果
* **源码中添加连续多个空行或者空格，会被解析为单个空格！** 要想达到某些效果（比如大量换行 line break），必须使用标签。


CSS 样式
------


大型网站中一般都是使用单独的 CSS 文件。这样用 CSS 优点是 CSS saves a lot of work. It can control the layout of multiple web pages all at once.


### 使用方法


有三种方式使用 CSS：


1. 内嵌，直接在元素中指定 `style` 属性，语法是：`style="CssProperty:CssValue;"`，别忘了后面有个分号，比如 `style="color:red;"`。这样的缺点就是如果要修改，就比较麻烦，工作量大。
2. 在 `<head>` 部分中使用 `<style>` 标签，语法是
 
```css
<head>
<style>
    tagName            {attrName:attrVal; attrName2:attrVal2;}
    #tagID             {attrName:attrVal; attrName2:attrVal2;}
    tagName.className  {attrName:attrVal; attrName2:attrVal2;}
</style>
</head> 

```
3. 引用外部 CSS 文件，需要在 `<head>` 里面使用 `<link>`：
 
```html
<head>
  <link rel="stylesheet" href="path/name.css">
</head>

```


### 常用属性


* `background-color` 表示背景颜色，可以使用预定义的名字或者 RGB
* `color` 表示颜色
* `font-family` 表示 **字体族** 而不是字体。大概就，如果电脑里没找到指定字体，就从字体族里面找一个最合适的。如：`font-family:verdana`; 和 `font-family:courier;`
* `font-size` 表示字体大小，可以指定相对大小（`font-size:300%`）或者绝对大小
* `text-align` 表示对齐方式。比如 `text-align:center;` 表示居中。


### 边框


每一个元素都是有一个边框的，通常默认不可见。这些边框也能用 CSS 定义样式。


* `border`，可以使边框可见
* `padding`，在 border 里面，类似缩进
* `margin`，在 border 外面，表示跟外面留了多少空间


例：



```css
p {
  border: 1px solid black;
  padding: 10px;
  margin: 30px;
}

```

其中 `solid` 的含义是实线边框。类似的还有 `dotted` `dashed` `double` 等风格。


效果如图，边框左边的大缝隙是 margin，边框里面距离文字的小缝隙是 padding。


![](https://s2.loli.net/2023/03/06/GiSpAYNHe7xsTkg.png)


格式化
---


HTML 的一些格式化标签，可以实现特殊显示效果，比如：


* Bold text 粗体，`<b>` 或 `<strong>` 表示，二者显示效果相同
* Important text 语义上（semantic）表示重要文本，`<strong>`
* Italic text 斜体，`<i>` 或 `<em>` 表示，二者显示效果相同
* Emphasized text 语义上表示强调文本，`<em>`
* Marked text，高亮文本，`<mark>`
* Small text 字变小，`<small>`
* Deleted text，删除线 `<del>`
* Inserted text 表示新插入的文本，`<ins>`，默认显示效果是带下划线
* Subscripts 下标，`<sub>`
* Superscripts 上标，`<sup>`
* Code 代码片段，实现等宽字体，`<code>`。但并不是所见即所得，比如换行符和多余空格会被单个空格代替。如果希望所见即所得，可以把 `<pre>` 标签套在 `<code>` 外面
* Variable 表示变量，`<var>` 套起来的文本显示出来就是斜体，有点像 LaTeX 的 `$$`


以上标签都是需要一开一关的标签。


引用 quotation
------------


不太重要的标签，了解即可：


* `<q>` 短引用，会在文本中添加引号
* `<blockquote>` 长引用，不带引号，有缩进，类似 markdown 里的 `> xxx`
* `<abbr>` 缩写，文本会添加下划线，鼠标移上去显示指定内容（`title` 属性值）
* `<address>` 规范联系信息的显示，默认效果是斜体
* `<cite>` 表示作品标题，比如提到了某个书的名字，可以用这个标签（类似中文的书名号）


注释
--


HTML 注释的格式是



```html
<!-- 注释内容 -->

```

注意开头多了个感叹号。


### 条件注释 conditional comment


例如



```html
<!--[if IE 8]>
这里的代码只有 IE8 当中会执行
由于这个 markdown 编辑器不是使用 IE8 渲染
所以显示成绿色了
<![endif]-->

```

类似于 C\+\+ 里面的 `#ifdef / #endif` 实现的条件编译。


