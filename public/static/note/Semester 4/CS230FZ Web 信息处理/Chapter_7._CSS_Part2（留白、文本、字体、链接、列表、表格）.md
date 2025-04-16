
Chapter 7\. CSS Part2（留白、文本、字体、链接、列表、表格）
========================================


框内留白 padding
------------


跟 `margin` 非常类似。`padding` 的取值有：


* px, pt, cm 等单位指定的长度
* 百分比，相对于父元素
* `inherit`，继承父元素


王修涵（Weight X Height）
--------------------


宽度高度，**不包含** 边框以及框内外留白，只是单纯的设置显示的内容区域的大小。


还有 `max-width` 与 `max-height`。可以实现图片的等比例缩放。


文本格式化 Text
----------


涉及的比较多，这里只是一些比较重要的。


### 文本水平对齐 `text-align`


`left` 或 `right` 或 `centered` 或 `justified`（拉伸，实现类似 Word 的两端对齐）


### 划线 `text-decoration`


取值 `overline` `underline` `line-through` `none` 等，设置上划线删除线等。


把 `text-decoration: none;` 扔给 `<a>` 可以取消超链接的下划线。


【26 27 没讲】


### 文本方向 `direction`


取值 `rtl` 可以实现从右向左的排版。


![](https://s2.loli.net/2023/04/24/ReLpDGTKWEaiVYw.png)


### 文字间距 `word-spacing`


取值是像素等单位。假如取值 $x$，那么实际间距是 $\\operatorname{default} \+ x$。


字体 `font`
---------


### 字体族 `font-family`


![](https://s2.loli.net/2023/04/24/94BgtCFJY6GfOzb.png)


* generic family，看起来类似的，比如 serif 和 monospace
* font family，特定的字体族，像 Times New Roman


指定 `font-family` 的值的时候应当设定多个，第一个是最希望的效果，如果第一个不存在，让浏览器选取后面的：`font-family: "Time New Roman", Times, serif;`。


### 字形 `font-style`


取值可以是 `normal` `italic` `oblique`（也像是斜体）。


### 字号 `font-size`


可以是相对大小和绝对大小。如果不指定，`p` 标签当中的默认是 16px，16px\=1em。


绝对大小，在不同浏览器里，显示字体大小是一样的。但是不同大小的显示器上固定大小，显然不太合理。所以已知显示器（输出设备）尺寸的情况下，绝对大小才比较有用。


而相对大小表示字号与周边元素相关。


W3C 推荐使用 `em` 作为字体大小的单位。可以在不同浏览器当中自动适配字体大小。？？？？？？？？这个需要实践一下才能理解可能。


[Stackoverflow: Why em instead of px?](https://stackoverflow.com/questions/609517/)


对于老板 IE 浏览器，em 好像会有点问题。大的偏大，小的偏小。于是把 `body` 的 `font-size` 设置成 `100%` 之后再设置 `em` 就可以解决。


链接
--


这几种，其实都是 `<a>` 配合 CSS 实现的效果。比如通过背景色、padding 等特性，就可以搞成右边那个按钮的样子。


![](https://s2.loli.net/2023/04/24/PRT3Ii9mFA1swyh.png)
之前提到过，链接有多种状态：


* 未访问 `link`：默认蓝色下划线，
* 访问过 `visited`：默认紫色下划线
* 鼠标悬浮状态 `hover`，顾名思义，默认鼠标形状改变
* 活跃状态 `active`，指的是，鼠标点了一下但还没有释放：默认红色下划线


注意，为了防止 CSS 覆盖失效，`:hover` 要放在 `a:link` 和 `a:visited` 的后面，`a:active` 要放在 `a:hover` 的后面。


顺带提一句，`<a>` 的默认是 `display: inline;`。如果设置 `display: inline-block` 之后，就可以指定 width 和 height。


列表
--


### 标志样式 `list-style-type`


之前说过，针对无序列表，样式 `list-style-type` 具有四种可选值，可以指定行首的标记：


* `disc`，表示每一行用实心粗圆圈 $\\bullet$ 打头
* `circle`，就是用空心圆圈打头
* `square`，方块（实心）
* `none`，没有行首标志，但是有缩进


针对有序列表，`list-style-type` 取值有：


* `upper-roman` 大写罗马数字
* `lower-alpha` 小写英文字母


### 图片替代标志 `list-style-image`


还可以用 `list-style-image: url(xxx)` 用图片指定行首标志


### 标志的位置 `list-style-position`


* `inside` 离得远一点
* `outside` 离得近一点，是默认的


![](https://s2.loli.net/2023/04/24/ynlQ6rtLNgpuIE7.png)


### 缩写：`list-style`


按照 `type` \- `position` \- `image` 的顺序。


比如：`square inside url("xxx.gif")`，代表图片能显示就显示图，不能显示就是方块。


### 奇怪的一点应用


* 做成一个垂直表格的样子


![](https://s2.loli.net/2023/04/24/n5IbD8zC6kNStru.png)


![](https://s2.loli.net/2023/04/24/GwHceoDQsrOKF2U.png)


表格
--


### 对齐 `text-align` \& `vertical-align`


前者用于水平对齐，后者用于竖直对齐。


### 鼠标悬浮效果 `:hover`


`tr:hover` 可以改变鼠标所在的行的样式。


### 斑马条纹效果 zebra\-striped `:nth-child(even/odd)`


`tr:nth-child(even)` 表示偶数行，剩下的没有指定的就是奇数行。Vice Versa。


