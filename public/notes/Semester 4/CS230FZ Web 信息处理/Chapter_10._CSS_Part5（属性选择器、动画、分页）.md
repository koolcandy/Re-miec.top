# Chapter 10. CSS Part5（属性选择器、动画、分页）

## CSS 属性选择器

就是选择指定了某个属性的或具有某个属性值的元素

*   `a[target]` 表示选择所有指定了属性 `target` 的 `<a>` 元素
*   `[attr="val"]` 表示选择所有属性值恰好等于 `val` 的任意元素
*   `[attr~="val"]` 表示，选择所有属性值包含 **完整单词** `"val"` 的任意元素。**单词不同于子串**，因为单词必须是被 **空格分隔** 的独立的一段，`hahaval`，`haha-val` 这样用破折号隔开的也不行。
*   `[attr|="val"]` 表示，选择所有属性值以 `"val"` 开头的任意元素。这个也要求 `"val"` 是个 **单词**，但是不那么严格，包含破折号的 `"val-"` 打头的也可以，如 `val-haha` 可以，但是 `valhaha` 还是不行。
*   `[attr^="val"]` 表示，只要 **开头** 依次是 `"val"` 这几个字符就行
*   `[attr$="val"]` 表示，只要 **结尾** 依次是 `"val"` 这几个字符就行，这俩像正则语法
*   `[attr*="val"]` 表示，属性值包含 **子串** `"val"` 就行

这个属性选择器对于选择不同类型的 `input` 元素很有用。

## CSS 动画效果

CSS3 可以用 `transition` 实现不同样式的平滑的动画转变效果。

`transition: width 0.4s ease-in-out` 表示，对于宽度属性的变化，在 0.4s 内完成，先慢，然后快一点，最后再慢。可以实现宽度逐渐变长变短。

对于按钮元素，指定 `transition-duration: 0.4s` 可以实现许多样式切换。比如 `:hover` 的时候假如要切换按钮颜色，加上这句话就会有动画渐变效果。

## CSS 实现分页效果 pagination

用列表元素实现。

### 第一步：基本布局

```css
ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 0;
}
ul.pagination li { display: inline; } /* 水平导航条 */
ul.paginaiton li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
}
```

```html
<ul class="pagination">
  <li><a href="#">1</a></li>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
</ul>
```

![分页效果](https://s2.loli.net/2023/05/22/aBeF47A5qUPhYCf.png)

### 第二步：一些样式

```css
ul.pagination li a.active {
  background-color: #4caf50;
  color: white;
}
ul.pagination li a:hover:not(.active) {
  background-color: #ddd;
}
ul.paginaiton li a {
  transition: 0.3s;
  border: 1px solid #ddd;
}

/* 两侧圆角 */
.pagination li:first-child a {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.pagination li:first-child a {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
```

![添加样式后的分页效果](https://s2.loli.net/2023/05/22/aYkdrHztsRALo19.png)

### 高端的东西：`:before` 伪类

可以用来添加分隔符

![添加分隔符](https://s2.loli.net/2023/05/22/oil58f9jKZgpFMT.png)

## CSS3

就这一页，没了。

![结束](https://s2.loli.net/2023/05/22/pjBxCcWElsogeyY.png)
