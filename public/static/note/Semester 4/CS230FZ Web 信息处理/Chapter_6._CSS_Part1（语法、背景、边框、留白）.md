# Chapter 6. CSS Part1（语法、背景、边框、留白）

全称叫做层叠样式表（cascading style sheets）。

有三种方式使用 CSS：外部样式文件、内部样式代码（不太灵活，页面独有的样式属性才用）、内嵌到元素中的样式。前两种方式的例子如下：

```html
<head>
  <!-- 使用 <link> 标签引用外部样式文件，要放在 <head> 里面 -->
  <link rel="stylesheet" type="text/css" href="mycss.css">

  <!-- 用 <style> 标签指定该文件的样式，也要放在 <head> 里面 -->
  <style>
    /* xxx */
  </style>
</head>
```

对于前面两种 CSS，在 **选择器和元素都相同** 的情况下，优先级关系是：**前面定义的 < 后面定义的**。也就是说，定义越晚，优先级越高，可以覆盖掉之前的样式。**而内嵌的 CSS 永远具有最高优先级。**

> 注：这里关于优先级的描述不完整。

## 语法与选择器

### 语法

每一条 CSS 规则都是由选择器和 declaration block 构成的。declaration block 中间有若干由分号分隔的 property-value pair。每个 pair 用冒号分隔 property 与 value。

![CSS 规则结构](https://s2.loli.net/2023/04/10/wMVlPDQOKJma15i.png)

CSS 的注释格式与 HTML 不同，是 `/* xxx */`。不是 `//`。

```css
// NO
/* YES */
```

### 选择器

选择器就是根据元素的 `name`，`id`，`class` 与属性等来确定元素的东西。分若干类：

*   element selector，直接写元素名：`tagName {}`
*   id selector，用井号 `#` 后面接上 id 值：`#id {}`。由于 id 唯一，这只能选择一个元素。
*   class selector，点号 `.` 后面接上类名：`.class {}`。即使元素类型不同，只要类名一致，就可以被选中。顺带一提，一个元素可能同时属于多个类，即拥有多个类名，空格分隔，如 `<p class="c1 c2">`。也可以指定标签，比如 `p.c1` 表示类名 `c1` 的 `<p>` 标签。
*   grouping selector，多个选择器如果想要搞一样的格式，可以直接逗号隔开，如 `sele1, sele2, sele3 {}`

## 背景 background

### 背景颜色 `background-color`

略

### 背景图片 `background-image`

用于指定选定的标签（元素）的背景图片。

如果图片的大小跟元素的大小不一致？默认情况下，这个图会在水平和垂直方向上自动进行自我复制，保证填充满该元素的背景。

而 `background-repeat` 可以指定是否重复或仅允许水平还是竖直的重复。

图片的位置也可以更改，使用 `background-position`。

甚至可以固定位置——即使鼠标滚轮进行了页面滚动，使用 `background-attachment: fixed`。

```css
body {
  background-image: url("https://...");
  /* repeat-x 只能在水平方向进行复制，repeat-y 垂直方向，no-repeat 顾名思义 */
  background-repeat: no-repeat;  /* 表示不能复制 */
  background-position: right top; /* 若禁止重复，则表示图片放在元素的右上角 */
  background-attachment: fixed; /* 不管怎么滚动，图片都固定右上角 */
}
```

### 缩写 shorthand

可以用 `background` 代替 `background-xxx`，值的顺序关系是：

1.  `background-color`
2.  `background-image`
3.  `background-repeat`
4.  `background-attachment`
5.  `background-position`

个别属性值缺少，也没关系。也就是说以上五个不需要每个都要给出，只要整体来看是按照这个顺序，就行。

如：

```css
body {
  /* 指定了背景图片，不复制，在右上角 */
  background: url("https://...") no-repeat right top 
}
```

## 边框 border

四条边（按照 **上右下左** 的顺序）可以分别指定样式（空格分隔）。如果只写了三个（没写全），那么三个值就是对应：上（左+右）下。如果只写了两个，那这两个就对应：（上+下）（左+右）。

上述方法的可读性太差了。有时候不如直接 `border-[top|right|bottom|left]-style` 这样指定具体是哪一条边。

### 边框样式 `border-style`

`border-style` 的取值有挺多，主要是前四种

*   `dotted`，点
*   `dashed`，虚线
*   `solid`，实线
*   `double`，双实线
*   `groove`，3d
*   `ridge`，3d
*   `inset`，3d
*   `outset`，3d
*   `none`，无边框
*   `hidden`，有但是隐藏了

### 边框宽度 `border-width`

有多种单位：像素 px，pt，cm，em，或使用预设值（`thin`，`medium`，`thick` 三者之一）。

### 边框颜色 `border-color`

略

### 缩写 shorthand

类似于背景，边框也能缩写：用 `border` 代替 `border-xxx`，顺序如下：

1.  `border-width`
2.  `border-style`（必须）
3.  `border-color`

所以实验当中经常有：`1px solid black` 的写法。

## 框外留白 margin

`margin` 的取值有：

*   `auto`，浏览器自动计算留白大小（左右一致），以此 **实现居中**
*   px, pt, cm 等单位指定的长度
*   百分比，相对于父元素
*   `inherit`，继承父元素

也可以四个方向分别指定。
