
Lecture 12\. JS 对象
==================


字符串
---


有几个常用函数


* `s.indexOf(t, start=0)`，返回从 `start` 开始第一次出现 t 的位置或 \-1
* `s.lastIndexOf(t, start=0)`，返回从 `start` 开始最后一次出现 t 的位置或 \-1
* `s.slice(start, end=n)` 和 `s.substring(start, end=n)` 用于切割子串，二者都是左闭右开
* `s.substr(start, len=n-start)` 返回某个位置开始的指定长度的子串
* `s.replace(s1, s2)` 用于查找 `s1` 并替换为 `s2`
* `s.toUpperCase()` 和 `s.toLowerCase()` 顾名思义
* `s.concat(sep, s2)` 用于字符串拼接，相当于 `s = s + sep + s2`
* `s.charAt(pos)`，有些浏览器也支持 `s[pos]`，但是 `charAt()` 比 `[]` 更安全
* `s.charCodeAt(pos)`，返回的是这个位置字符的编码
* `s.split(sep)` 顾名思义。其中 `sep` 可以是 `""`


数字
--


### NaN \- Not a Number



```javascript
var x = 100 / "apple";  // 就会得到 NaN
var y = 100 / "10";     // 会得到 10
var fx = isNaN(x);      // fx = true
var fy = isNaN(y);      // fy = false

```

如果 NaN 参与到了算术运算当中，得到的就一定还是 NaN。如果参与到字符串运算当中，就会作为字符串处理。


### 常用函数


* `toString()` 把任意类型的数字转换成字符串
* `valueOf()` 常用于 Object，可以把数字类型的 Object 转换成原始数据类型
* （事实上，JavaScript 的所有类型，都具有 `toString()` 和 `valueOf()` 这俩函数）
* `Number(xxx)` 可以把 `xxx` 转换为数字，比如 `Number("10 ")`，`Number(new Date())`，`Number(true)` 之类的，但是如果遇到 `Number("12 34")` 会返回 NaN
* `parseInt(str)` 会把传入的字符串转为数字。可以认为字符集是 `[0-9]`。遇到字符集以外的就终止。
* `parseFloat(str)` 与 `parseInt()` 类似。可以认为字符集是 `[0-9\.]`。
* `Math.min()` 和 `Math.max()` 顾名思义，可变参数长度
* `Math.random()` 返回 $\[0, 1\)$ 之中的随机实数，通过数学变换可以变成任意区间的随机数
* `Math.round(x)` 可以返回最近的整数（返回 `int(x+0.5)` 的值），相当于四舍五入
* `Math.celi(x)` 和 `Math.floor(x)` 顾名思义


日期
--


日期从 1970 年 1 月 1 日 00:00 开始（UTC \+0）



```javascript
new Date();  // 返回当前时间，结果是：Mon Jun 12 2023 11:47:53 GMT+0800 (中国标准时间)
new Date(86400 * 1000);  // 传毫秒，加一天：Fri Jan 02 1970 08:00:00 GMT+0800 (中国标准时间)
new Date(99, 5, 24, 11, 33, 30, 0);  // 表示 1999 年 (5+1) 月 24 日 11 点 33 分 30 秒 0 毫秒
                                     // Thu Jun 24 1999 11:33:30 GMT+0800 (中国标准时间)
new Date(99, 5, 24); // 后面的省略了就是零：Thu Jun 24 1999 00:00:00 GMT+0800 (中国标准时间)

```

日期和日期直接可以直接用大于小于号进行比较，实际上就是比较的毫秒数。


### 常用函数


* `d.toString()`，格式就是刚刚那一大坨
* `d.toDateString()`，格式是 'Thu Jun 24 1999'
* `d.getDate()` 获取今天是几日
* `d.getDay()` 今天是星期几（0\~6），周一到周六对应 1\~6，周天是 0
* `d.getTime()` 表示获取从零时间到现在的毫秒数
* `d.getFullYear()` 获取年份（四位数）
* `d.setBlabla()` 跟 get 反过来而已
* `Date.parse(str)` 如果传入的字符串是一个合法的日期，就返回这个日期距离零时刻的毫秒数
* `new Date(str)` 如果传入的字符串是一个合法的日期，就返回这个日期的对象


数组
--


* 创建数组有两种方式，一种是 `var arr = [a, b, c];`，一种是 `var arr = new Array(a, b, c);`；第二种效率上比较慢
* 由于 JavaScript 是弱类型的，数组当中的元素的类型可以不同，比如 `arr = {Data, arr2, "haha"}`
* `arr.toString()` 用于把数组转化成字符串：`[a, b, c].toString() == [a,b,c]`，生成的字符串中间无空格；如果想要有空格，或者其他的分隔符，可以用 `arr.join()`：`[a, b, c].join(" * ") == a * b * c`
* `arr.reverse()` 相当于 python 里面的 `arr = arr[::-1]`
* `arr.sort()` 用于给数组按照 **字典序** 进行排序。比如整数数组 `[3, 2, 1, 10].sort()` 排序得到的是 `[1, 10, 2, 3]`；那如果想要按照数值进行排序，可以给 `sort()` 提供一个自定义比较函数：`[3, 2, 1, 10].sort(function(a,b){return a-b})` 就是按照数值升序排序
* `arr.slice(x)` 相当于 Python 当中的 `arr[x:]`；也可以两个参数，`arr.slice(x, y)` 左闭右开


### 添加或删除元素


* 可以用 `arr.push(x)` 来往数组当中添加元素，返回新的数组长度；
	+ 对应的，`arr.pop()` 用于返回并删除最后一个值；
	+ 与 `pop` 类似，`arr.shift()` 用于返回并删除第一个元素；
	+ 与 `shift` 类似，`arr.unshift(x)` 用于在第一个位置添加元素并返回新的数组长度
* 还有一种神奇的添加元素的方式：`arr[arr.length] = x`，不会发生越界异常；如果下标填的偏大，也不会越界，会在数组当中产生一堆 empty 的位置（undefined）
* `arr.splice()` 很强，同时具有插入和删除的功能。`arr.splice(pos, delCnt, ...)` 用于在数组的指定位置添加若干个元素。`delCnt` 指定从 `pos` 开始删除多少个元素，如果只是想要添加的话，这个参数就填 `0`
* `arr1.concat(..)` 用于连接数组。`arr1.concat(arr2, arr3)` 用于把后两个数组的元素按照下标顺序添加到第一个数组


JS 的域（scope）
------------


JavaScript 把变量、函数、对象都视作变量，scope 就是指能访问的变量有哪些


在一个 function 当中定义的变量，只能在函数的范围内被访问（LOCAL 的）。比如：



```javascript
<script>
function fun() { var name = "haha"; }
</script>

<script>
document.getElementById("hahaid") = name;  // 这里会获得 undefined
</script>

```

但是假如变量定义在 function 的外面，就是 GLOBAL 的：



```javascript
<script>
var name;
function fun() { name = "haha"; }
</script>

<script>
document.getElementById("hahaid") = name;  // 这里会获得 "haha" 的值
</script>

```

如果变量没有在 function 外面定义，直接在 function 里面赋值，会自动视作 GLOBAL 的。确切的说，会是 `window` 对象的属性



```javascript
<script>
function fun() { name = "haha"; }
</script>

<script>
document.getElementById("hahaid") = name;  // 这里会获得 "haha" 的值
document.getElementById("hahaid") = window.name;  // 这样也可以
</script>

```

LOCAL 的变量在函数结束后销毁，GLOBAL 的变量在页面关闭的时候销毁。


