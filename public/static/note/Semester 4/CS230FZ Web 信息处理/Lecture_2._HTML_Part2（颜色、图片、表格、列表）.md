
Lecture 2\. HTML Part2（颜色、图片、表格、列表）
===================================


颜色
--


如果使用常见颜色，可以直接使用颜色名称，比如 red cyan blue 之类的。这种预设名称非常多，140 多种，[W3 School](https://www.w3schools.com/colors/colors_names.asp) 有罗列


如果要定制颜色，可以用 RGB 表示：`rgb(xxx, yyy, zzz)` 或 `#rrggbb`


更丰富的超链接用法
---------


### 链接状态


链接有好多种默认状态：


* 未访问：蓝色下划线，
* 访问过：紫色下划线，
* 活跃状态，指的是，鼠标点了一下但还没有释放：红色下划线
* 鼠标悬浮状态，顾名思义


颜色可以用 CSS 修改，其中 `text-decoration:none` 表示不显示下划线


![](https://s2.loli.net/2023/03/13/dZq6ucPtp2eo5Ma.png)


### 相对路径与绝对路径


绝对路径比较好说，略。


相对路径有两种主要形式：


* `href="/folder/page1.html"`，表示网站 **根目录下** 的 folder 文件夹下的页面
* `href="page2.html"`，没有开头的斜杠，表示 **当前文件目录下** 的页面


### 杂记


* `mailto:xxx@yyy.com` 作为链接，可以启动邮件客户端
* 除了文本可以作为链接文字，图片、按钮也可以附上链接。图片链接比较简单，文本替换为 `<img>` 就好了；按钮链接的一种实现方式是在 `onclick` 属性值当中使用 js 代码进行跳转：

```html
<button onclick="document.location='linkto.html'">ButtonText</button>

```
* 链接的 title，就是鼠标移动到链接上的时候，弹出来的提示信息，用 `title` 属性指定
* 书签 bookmark，可以快速定位到页面的某个特定部分。先给目标位置的标签添加上 `id` 属性，比如 `id="myid"`，然后链接地址写 `href="#myid"` 就是定位到当前页面该元素的位置；如果写 `href="page#myid"` 就是打开指定页面再定位到指定元素的位置


图片
--


### 宽度和高度


`<img>` 标签可以指定 `height` 和 `width` 属性，而高度和宽度也可以在 style 当中指定。最好在 style 里面指定，因为假如外面有 CSS 制定了一部分 `width`，那么直接用 `width` 属性可能就会被 style 覆盖导致变形了，而使用 CSS 可以忽视外层 CSS。


![](https://s2.loli.net/2023/03/13/5vKZE68lehwqCGX.png)


一定要指定宽度高度，要不然加载时的显示效果可能很怪。


### 浮动


CSS 里面有一个 property 叫做 `float`，取值可以是 `left`, `right` 等等。


当 `<img>` 嵌在 `<p>` 里面，在 CSS 里面指定 `float` 的取值，就可以实现指定是文字左侧浮动还是文字右侧浮动。


### 图片映射 Image Map


可以用来定义图片当中可以点击的区域。


在 `<img>` 标签当中使用 `usemap` 属性指定映射的名字，然后再配合 `<map name="">` 标签来实现。`<map>` 里面需要嵌套 `<area>` 标签，其具有属性 `shape`, `coords`, `alt`, `href` 等。



```html
<map name="planemap">
  <area shape="rect" coords="0,0,82,126" alt="Sun" href="sun.html">
  <area shape="circle" coords="90,58,3" alt="Mercury" href="mercury.html">
  <!-- for more <area>'s .. -->
</map>

```

表格
--


* `<table>` 表示表格开始，可以用 `style="width:100%"` 表示表格宽度占父元素的 100%
* `<caption>` 表示表格的标题。默认会居中显示在第一行上方
* `<tr>` 表示一行的数据，是英文 table rows 的缩写
* `<td>` 嵌于 `<tr>`，表示行当中的一个单元格的数据，是 table data 的缩写
* `<th>` 用法类似于 `<td>`，表示的是标题行，是 table header 的缩写。默认会加粗且居中显示。


### 表格边框


默认情况下的表格是不含边框的，以空白分隔。在 `<table>` 标签当中使用 `border` 属性可以指定单元格边框的粗细。



```html
<table border="1px" width="100%">
  <!--blabla-->
</table>

```

可是这个边框会同时应用给每个单元格和整个表，每个单元格都有一圈单独的边框，所以最终显示出来是双层的，并不太好看。


![](https://s2.loli.net/2023/03/13/bMaCkLYuVyOxSTX.png)


更好的做法是，用 CSS。CSS 有一个名叫 `border-collapse` 的 property，有压缩合并边框的效果：



```css
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

```

![](https://s2.loli.net/2023/03/13/2WsdzoRBLjCvQk7.png)


### 留白


刚才加上边框之后，文字和边框紧挨着，也不好看。用 CSS 指定 padding 可以把文字往里面挪。注意，这个属性不要加给 `<table>`。这个 padding 可以在水平方向和垂直方向上都留出空白。



```css
th, td {
  padding: 15px;
}

```

![](https://s2.loli.net/2023/03/13/FoUPm32BMfYl7gu.png)


不同单元格之间的间隔也可以定义，包括上下左右四个方向。需要在 `<table>` 的 CSS 中指定 `boder-spacing`。然而，这个属性和刚才 `border-collapse: collapse` 是冲突的，不能同时用，否则没有效果。



```css
table {
  border-spacing: 5px;
}

```

![](https://s2.loli.net/2023/03/13/X7BKtSDMicbxq35.png)


### 文本对齐


用 CSS 的 `text-align` 可以指定 `left` 还是 `right` 还是啥的。


### 单元格合并


像这个「电话」列，需要占用两个列的宽度，可以写：`<th colspan="2"> xxx </th>` 表示把这一个单元格扩展到两倍宽度。


![](https://s2.loli.net/2023/03/13/Rqi1p7ay59n8VBj.png)


类似地，用 `rowspan` 可以给竖着方向表格的列也提供类似效果，只是这种表格麻烦一点。



```html
<table>
  <tr> <th>name</th> <td>BG</td> </tr>
  <tr> <th rowspan="2">tele</th> <td>854</td> </tr>
  <tr> <td>855</td> </tr>
</table>

```

![](https://s2.loli.net/2023/03/13/XnwUdsqAfIZmEc2.png)


### 奇数行偶数行颜色区分


用 CSS 实现。



```css
tr:nth-child(even) {
  background-color: #fff;
}
tr:nth-child(odd) {
  background-color: #ddd;
}

```

列表
--


分为无序列表、有序列表、描述列表，前两个比较常用。可嵌套。


### 无序列表



```html
<ul>
 <li>item1</li>
 <li>item2</li>
 <li>item3</li>
</ul>

```

样式 `list-style-type` 具有四种可选值，可以指定行首的标记：


* `disc`，表示每一行用实心粗圆圈 $\\bullet$ 打头
* `circle`，就是用空心圆圈打头
* `square`，方块（实心）
* `none`，没有行首标志，但是有缩进


### 有序列表



```html
<ol>
 <li>item1</li>
 <li>item2</li>
 <li>item3</li>
</ol>

```

有序列表的行首标号是自动生成的，后面会默认跟上一个点 `.`


有序列表标签的属性 `type` 可以指定标号的类型：


* `1`，阿拉伯数字，1234
* `a`，小写英文字母，abcd
* `A`，大写英文字母，ABCD
* `i`，小写罗马数字，i ii iii iv
* `I`，大写罗马数字，I II III IV


### 描述列表


涉及到三个标签 `<dl>`，`<dt>`，`<dd>`，分别是 list、term、description。



```html
<dl>
 <dt>term1 C</dt>
 <dd>desc1 BHD</dd>
 <dt>term2 M</dt>
 <dd>desc2 WCD</dd>
</dl>

```

效果大概就这样


![](https://s2.loli.net/2023/03/20/wdAEhRM2ISnOyrz.png)


### 水平布局


默认的列表是垂直方向排布的，也可以用 CSS 改成水平方向，只需要给 `<li>` 的 style 指定上：`display:inline;` 即可。这种水平的布局可以轻松实现 **顶部水平导航菜单**。


类似地，`display:grid` 可以垂直排布。


![](https://s2.loli.net/2023/03/20/fLgG8brQFtXzPEd.png)


![](https://s2.loli.net/2023/03/20/obSledMI6i4hQA8.png)


![](https://s2.loli.net/2023/03/20/HhK8wcTUbElS3gD.png)


