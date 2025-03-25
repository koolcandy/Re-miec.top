# Lecture 3. HTML Part3

## HTML 实体

### 字符实体

用于显示像 `<` 和 `>` 这种被 HTML 特殊解析的字符。如果想打出来这些字符（甚至包含键盘上面找不到的字符）就需要借助字符实体来显示。换句话说，**字符实体可以显示不在当前 charset 当中的字符**。

字符实体有两种格式，分别是 `&<name>;` 和 `$#id;`，注意末尾有个分号。比如 `&lt;` 和 `&#60;` 都是小于号 `<`.

如果手写 HTML 代码，有名字的就尽量用名字，没名字的只能用 id。名字是大小写敏感的，这样就可以用字符实体区分大小写希腊字母了。

最常见的字符实体是空格符（不换行的空格，non-breaking space）`&nbsp;`；此外还有若干：

![Character Entities](https://s2.loli.net/2023/03/20/CeVpUrSJKfqmIZY.png)

### Combining Diacritical Marks

可以跟其他字母组合，构成特殊字符（比如汉语拼音），即使新字符不在当前的 charset 当中

![Combining Diacritical Marks](https://s2.loli.net/2023/03/20/jYV6aEqNkS1985G.png)

## HTML 字符集（页面编码）

计算机当中所有的字符都是用二进制数字表示的。但是每个二进制数表示什么，这就涉及到了字符编码问题。常见的编码方式有：

*   ASCII，美国信息交换标准代码，是第一个字符集，总共 127 个不同的字符。内含阿拉伯数字和大小写字母、常见标点符号和常见特殊符号。其中：
    *   0-31 以及 127 共计 33 个控制字符
    *   32-126 是字母数字和符号
    *   128-255 空白
*   ANSI（Windows-1252），是 Windows 系统的字符集，支持 256 个不同字符。其中：
    *   0-127 与 ASCII 相同
    *   128-159 是专用保留的
    *   160-255 跟 UTF-8 是相同的
*   ISO-8859-1，是 HTML4 的默认字符集，支持 256 个不同字符。其中：
    *   0-127 跟 ASCII 一致
    *   128-159 空着没用
    *   160-255 跟 UTF-8 一致
*   UTF-8（Unicode），HTML5 的默认字符集，HTML4 其实也支持，覆盖了世界上几乎所有的字符：
    *   0-127 与 ASCII 一致
    *   128-159 空着没用
    *   256 之后还有上万个字符

指定 HTML 页面字符集的语法在 HTML4 和 HTML 5 当中有所不同。

HTML4：

```html
<meta http-equiv="Content-Type", content="text/html;charset=ISO-8859-1">
```

HTML5：

```html
<meta charset="UTF-8">
```

## Uniform Resource Locators 统一资源定位器

URL 说白了就是互联网上特定文件的网址。语法是：`协议://前缀.域:端口/路径/文件名`，详细的说：

*   协议 scheme，最常见的是 http
*   前缀 prefix，对于 http 和 https 来说，默认是 www
*   域 domain，就是域名
*   端口 port，指定端口号，http 的默认端口是 80
*   路径 path，就是服务器上的路径，如果省略不填，那就是网站的根目录

特殊的，对于某些拥有密码保护的页面，可能要这样：`https://用户名:密码@域名/路径/文件`

### 常见协议

*   http，是「hyper text transfer protocol」的缩写，最常见的网页协议，但是未加密
*   https，「secure hyper text transfer protocol」的缩写，加密了
*   ftp 是文件传输协议 file transfer protocol，用于文件上传与下载
*   file，是本地文件

### URL 编码

**所有的 URL 都是 ASCII 编码的**。如果 URL 当中想要包含非 ASCII 字符，就要编码一下。格式是 `%hex`。

此外，URL 也不能包含空格。通常 URL 编码方式会把空格变成 `+` 或者 `%20`。

输入的编码不同，会导致一些字符编码成 URL 编码之后也不同：

![URL Encoding Examples](https://s2.loli.net/2023/03/20/UQmybCKWXA6i2nt.png)

## 表单

`<form>` 标签。表单当中包含一些各种各样的输入元素、复选框、单选框、提交按钮等。

即使输入框没有写在 `<form>` 里面，也可以通过 `form` 属性填上表单 id 来实现相同功能。

注意，表单本身是不可见的，可见的东西是表单当中的各个元素。

### 各类 `<input>` 的 `type`

`<input>` 用于输入，没有 closing tag。`name` 属性可以区分不同的输入元素，所以名字 **应当唯一** 且 **必须指定**。此外，`type` 属性可以指定输入的东西是什么：

*   `text`，表示输入 **单行** 文字，默认文字宽度是 20 字符。用 `value` 属性可以指定初始化的文字内容。
*   `password`，用于输入密码。输入的字符默认用星号显示。
*   `submit`，表示提交按钮，用 `value` 属性指定按钮上的文字内容。点下去就会直接提交表单给 form-handler。
    *   通常 form-handler 是一段脚本或一个 php 之类的东西。
    *   form-handler 是在 `<form>` 标签中用 `action` 属性指定的。如：`<form action="page.php">`。
    *   如果未指定 form-handler，那么表单数据就会被提交给当前页面。
    *   可以用 `method` 属性指定提交表单的时候是 GET 还是 POST。默认是 GET。GET 与 POST 的最主要区别就是，GET 会把表单数据显示在 URL 上，POST 不会。
*   `radio`，表示单选框。同组的单选框之中只能选一个。组别用 `name` 属性区分，相同的 `name` 就是一个组。`checked` 属性可以指定用户操作前默认的选中项。
*   `checkbox`，类似于 `radio`，只不过这个是复选框。可以一个都不选，也可以全选。依然可以用 `checked` 指定默认选中项。
*   `button`，按钮

### HTML5 新增的各类 `<input>` 的 `type`

*   `number`，保证输入的是数字，输入框右侧会有上下小箭头。
*   `date`，日期选择框，可以设定最小最大日期是多少，精确到日
*   `month`，选择精确到月的日期（年月）
*   `week`，精确到星期（日历的一整行），当年的第几周
*   `time`，几点几分（不包含时区信息）
*   `datetime`，既包含日期又包含时间，而且还有时区信息
*   `datetime-local`，除了不包含时区信息（是本地时间），跟 `datetime` 一致
*   `color`，颜色选择框
*   `range`，左右拖动（滑动）条，step 是 1
*   `email`，用来输入电子邮件地址，浏览器会在提交的时候自动检查输入是否合法有些手机键盘会帮助用户输入一半后自动添加后缀 @xx.com
*   `url`，用来输入 url 地址，浏览器会在提交的时候自动检查输入是否合法。有些手机键盘会帮助用户输入一半后自动添加后缀 xx.com
*   `search`，搜索框，长得跟普通文本框没区别。可以在语义上帮助爬虫和搜索引擎理解这个输入框的意义

### 通用的 `<input>` 属性

这些属性对于各种类型的输入框基本都可用

*   `disabled`，失效状态（灰色），点不动，提交的时候也会忽略
*   `readonly`，只读，不能点，可复制；JS 可修改；提交的时候不会忽略
*   `maxlength`，顾名思义，最多接受多少个字符的输入。达到上限之后就输不动了。
*   `size`，表示输入框显示的宽度大小，不代表最大接受字符宽度
*   `value`，可以用于指定加载元素的时候的默认值

以下是 HTML5 新增的

*   `max` 和 `min`，指定最大最小值，HTML5 新增
*   `step`，通常跟 `min` `max` 配合，表示接受的值的间隔是多少。比如最小值 1，最大值 7，步长 2，那就只能取值 1 3 5 7；如果没有指定范围，那就是从 0 开始计步
*   `pattern`，可以用正则表达式来规定输入的字符串的模式（比如：邮箱）
*   `required`，表示必填项
*   `autofocus`，表示页面加载的时候自动把焦点设置在这个输入框
*   `placeholder`，占位符，可以用于提示用户这个位置框用来输入什么信息
*   `multiple`，表示可以输入多个值，通常是用于 `email` 与 `file` 类型的输入
*   `formaction`，给提交按钮定义这个属性，就会覆盖掉 `<form>` 里定义的 action。类似地，`formenctype`，`formmethod`，`formnovalidate`，`formtarget` 也能用来覆盖相应的东西。
*   `height` 与 `weight`，对于图片类型的输入，伸缩图像

### GET 与 POST

GET 方式会把表单数据 **直接在 URL 当中明文显示出来**（问号后面）。使用搜索引擎的时候就是 GET。通常在数据量不大且不需要保密的时候使用 GET 方法。

如果表单当中包含了敏感信息（比如密码）或者上传了图片之类的，就要用 POST。POST 是在 HTTP 的数据报文当中传输的，不会直接显示在 URL 里面。

### `<fieldset>`

作用是对于输入元素进行分组。还有一个辅助标签 `<legend>`，可以用来定义分组框的标题。

```html
<form>
  <fieldset>
    <legend> PI </legend>
    <!-- ... -->
  </fieldset>
</form>
```

![Fieldset Example](https://s2.loli.net/2023/03/20/yDbztLWQnIw3XRg.png)

### `<form>` 各项属性

*   `target` 指定提交行为，类似 `a`，是当前页面打开，还是新标签页之类的
*   `accept-charset` 指定接受的字符集
*   `enctype` 表示提交的数据的编码方式，默认是 URL 编码
*   `oninput` 表示表单中输入内容有变化的时候要执行什么

还有一些 HTML5 新增的

*   `autocomplete` 取值 on/off，表示是否打开浏览器自动补全
*   `novalidate` 表示不要让浏览器进行 validate

## 表单元素

*   `<select>`，可以实现下拉选择框。开闭之间用 `<option>` 标签指定备选项。被添加了 `selected` 属性的 `<option>` 标签是设置为默认选中项的，如果没有任何一个加入了 `selected` 属性，那么默认选中的就是第一个。
*   `<textarea>`，多行文字输入框（编辑框）。用 `rows` 和 `cols` 属性可以指定尺寸。它有 closing tag，开闭之间的内容是编辑框内的默认显示文字。
*   `<button>`，开闭之间的内容是按钮文字。`onclick` 属性是点击后执行的行为，通常是 JS。
*   `<datalist>`，HTML5 新增。与 `<input>` 配合使用。既可以在输入框当中直接输入想要输入的值，还可以从下拉列表框当中选取预设值。只要 `<input>` 的 `list` 属性当中填上 `<datalist>` 的 id 就可以了。
*   `<keygen>`，HTML5 新增。但废弃了。可以生成公钥。
*   `<output>`，HTML5 新增。

```html
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">  
  <input type="range" id="a" value="50">  
 +<input type="number" id="b" value="25">  
 =<output name="x" for="a b"></output>  
</form>
```

![Output Example](https://s2.loli.net/2023/03/27/TqI1ayufmCVKOMz.png)

可以用于显示计算 a+b 的结果。那个 `for` 属性是干嘛的我没搞懂。
