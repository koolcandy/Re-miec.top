
Chapter 9\. CSS Part4（对齐、选择器、伪类、导航条、下拉框）
========================================


`inline-block`
--------------


`inline` 即使制定了宽度高度，也没啥变化，该多宽就多宽。但是 `inline-block` 指定宽高之后，指定多少就是多少：


![](https://s2.loli.net/2023/05/08/HGpkcBtEamj7bYU.png)


如果要做网格，可以用 `float` 实现（最后记得 `clear` 掉）。但是有点麻烦。


用指定了宽高的 `inline-block` 会更方便。


CSS 的对齐
-------


### 通过 `margin:auto` 实现水平居中


**设置 `width` 之后**，再 `margin:auto` 就会让元素两边空白的的宽度自动平分，实现居中。


### 通过 `position:absolute` 实现左对齐或右对齐等


简单，略


### 通过 `float` 实现左对齐或右对齐等


用完记得 `clear` 


CSS 选择器的组合
----------


CSS 选择器可以包含多个简单选择器。多个选择器之间可以用 combinator 连接。CSS3 当中有四种 combinator：


* ：后代 descendant，匹配后代（不止一代）元素。`div p` 表示 `div` 后代的所有 `p`。
* `>`：child，匹配儿子一代。`div>p` 表示 `div` 子一代的 `p`。
* `+`：adjacent sibling，匹配最大的弟弟元素：sibling 是指父元素相同。
* `~`：general sibling，匹配所有兄弟。


CSS 伪类 pseudo classes
---------------------


语法是 `selector:pclass`，比如 `xx:hover`。


回忆：`a:hover` 必须写在 `a:link` 和 `a:visited` 的后面，`a:active` 必须在 `a:hover` 后面。


还有一个叫做 `:first-child` 的伪类，表示第一个儿子
\- `p i:first-child` 表示所有的 `<p>` 当中的第一个 `<i>`
\- `p:first-child i` 表示所有作为父元素长子的 `<p>` 当中的所有的 `<i>`


伪类大全：


![](https://s2.loli.net/2023/05/15/Bz6fRYiIE9JNjWo.png)
![](https://s2.loli.net/2023/05/15/O4gsrl3J9nuF7C1.png)
![](https://s2.loli.net/2023/05/15/OwSivIsqEu4A5Gp.png)


导航条 navigation bar
------------------


就是把链接仍在列表里，再添加好看的样式。


### 示例：一个垂直导航条


#### 第一步，把 item 之前的标志、留白、缩进都删掉



```css
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

```

#### 第二步，指定每个 item 的宽度和显示样式



```css
ul {
    width: 200px;
    background-color: #f1f1f1;
}

li {
    text-align: center;
    border-bottom: 1px solid #555;
}

li:last-child {
    border-bottom: none; /* 防止边框重叠 */
}

li a {
    display: block;
    color: black;
    padding: 8px 0 8px 16px; /* 为了显得居中 */
    text-decoration: none; /* 删掉链接的下划线 */
}

```

#### 第三步，指定链接样式



```css
li a.active {
    background-color: #4caf50;
    color: white;
}

/* 活跃状态（被选中的）就不需要改变悬浮样式了 */
li a:hover:not(.active) {
    background-color: #555;
    color: white;
}

```

#### 效果


![](https://s2.loli.net/2023/05/15/WTJ9gYuwtlvKV7h.png)


### 示例：一个水平导航条


#### 第一步，把 item 之前的标志、留白、缩进都删掉



```css
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

```

#### 第二步，指定每个 item 的宽度和显示样式



```css
li {
    float: left;
}

li a {
    display: block;
    padding: 8px;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none; /* 删掉链接的下划线 */
}

li a:hover {
    background-color: #111;
}

```

#### 第三步，对于关于按钮，扔到最右侧



```html
<li style="float:right"><a href="#about">About</a></li>

```

#### 第四步，固定位置



```css
ul {
    /* 固定到页面顶部，不受滚轮影响 */
    position: fixed;
    top: 0;
    width: 100%;
}

```

#### 效果


![](https://s2.loli.net/2023/05/15/E1TYJu6zMD3oU78.png)


CSS 实现下拉框
---------


不是那种下拉框的元素，是用 CSS 实现，鼠标移动到某个元素之上的时候，自动展开一个框框。


![](https://s2.loli.net/2023/05/15/wi5IBy7bDUruNYk.png)


### 关于实现


`dropdown-content` 默认是 `display:none` 的，当鼠标悬浮之后，改成 `display:block`。


### 关于位置


`dropdown-content` 的位置（`position`），要设置成 `absolute`。由于 `dropdown` 的位置不是 `static`，所以 `dropdown-content` 会根据 `dropdown` 进行定位，这就实现了


