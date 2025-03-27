# Chapter 8. CSS Part3（显示样式、位置、浮动）

## Box Model

也就是一个元素占用的区域的范围。每个元素占用的区域都相当于一个矩形。这个 box model 包含 margin、border、padding、content 四个东西。

![Box Model](https://s2.loli.net/2023/04/24/ztG5gXFAN4dneUV.png)

定义的 width 与 height 只是 content 部分的大小。

## 显示样式 `display`

大部分元素的默认 `display` 值都是 `block` 和 `inline`。两者最大的区别是，`block` 的元素宽度等于父元素的 100%，所以一定会另起一行；`inline` 内容多宽就占用多宽，所以不会另起一行。

但是 `inline-block` 是啥，第九节课件上才有提到。

### 默认 `block` 有哪些

- `<div>`
- `<h1>-<h6>`
- `<p>`
- `<form>`
- `<header>` `<footer>` `<section>`
- `<li>`

### 默认 `inline` 有哪些

- `<span>`
- `<a>`
- `<img>`

把 `<li>` 改成 `inline` 可以实现一个水平菜单。

### 有点特殊：`display:none`

通常结合 JavaScript，控制元素的可见性，比删除或新增元素简单

#### `display:none` VS `visibility:hidden`

`display:none` 会直接把元素所占用的位置给清掉，而 `visibility:hidden` 仅仅是隐藏，但是该占用多少空间，还是会留着的。

![display:none](https://s2.loli.net/2023/05/08/dS4N6zjZv2bImw5.png)

![visibility:hidden](https://s2.loli.net/2023/05/08/ZSDFWfepIhyR4bk.png)

## CSS 的位置

### `position` property

`position` 用来指定元素的 positioning method，有四种取值：

#### `static`

默认值，不受 `top`, `bottom`, `left`, `right` 这四个 property 的影响，完全根据页面元素布局流来确定位置。

![position:static](https://s2.loli.net/2023/05/08/6nsDf73ojkdCl5J.png)

#### `relative`

会参照默认的位置进行一定的偏移（根据 `top`, `bottom`, `left`, `right`）。于是会产生一些空白。这些空白里不会出现其他的元素。

![position:relative](https://s2.loli.net/2023/05/08/oh5aeOyqwZicJM3.png)

#### `fixed`

顾名思义，位置是固定的，也就是说，位置相对于页面来说，固定不变的。即使页面滚动了，它的位置还是会保留不变。

![position:fixed](https://s2.loli.net/2023/05/08/jilzDAFsPGB1Coe.png)

#### `absolute`

相对最近的 `position != static` 的祖先进行偏移。如果不存在这个祖先，那么就是 `<body>`。

![position:absolute](https://s2.loli.net/2023/05/08/nxSVP5ygDGTcLkE.png)

### 关于元素重叠

元素发生重叠之后，哪个在上层，哪个在下层？

`z-index` property 可以指定遮挡的顺序。这个值越大，就越靠前；值越小，就月靠下，容易被遮挡。

#### 例：在图片当中放置文字

其中 `img` 的 `opacity` property 用于指定透明度。这样就不用 `z-index` 了。

这里 `div.container` 的大小和位置其实是跟 `<img>` 一模一样的

![文字放置图片](https://s2.loli.net/2023/05/08/WqMDnPr93ysExcK.png)

##### 关于居中的奇技淫巧

实验课里面那一堆乱七八糟的居中实在是太烦人了！

- `left` 设成 0，同时 `width` 设成 100%，就相当于实现了水平居中。
- `top` 设成 50%，就实现了垂直居中。

不过这好像只适用于单行文本。

![居中](https://s2.loli.net/2023/05/08/5sdCxyDM8iwUr9j.png)

## CSS 的浮动

涉及到两个特性：`float` 与 `clear`。

`float` 设定一个元素是否要 `float`。

一个拥有 `float` 属性的元素后面的元素，位置也会浮动，这时候可以用 `clear` 指定一个元素周围指定方向上禁止浮动。

![float](https://s2.loli.net/2023/05/08/NbD7vQJyGqCMHcd.png)

![clear](https://s2.loli.net/2023/05/08/sSIKerZcAoQH5XR.png)

### clearfix hack: 用 `overflow:auto` 解决

听起来很高级但好像不是那么高级。防止悬浮元素的溢出。

![overflow:auto 1](https://s2.loli.net/2023/05/08/E8tdw6nHB5FTULO.png)

![overflow:auto 2](https://s2.loli.net/2023/05/08/PcVEaC6tT3YqIgu.png)
