# Lecture 6: More Advanced Pattern Matching 高级模式匹配

[https://xkcd.com/208/](https://xkcd.com/208/)

![](https://s2.loli.net/2023/03/18/p6ZzjJyxrBo7CP5.png)

## 模式匹配和正则表达式（使用 `SIMILAR TO` 运算符和 `~` / `~*`）

说白了，就是把 `LIKE` 替换成 `SIMILAR TO` 或者 `~`或者 `~*`，然后模式串换成了正则表达式。

其中，好像 `SIMILAR TO` 只适用于模式匹配，正则表达式要用波浪线~~（具体我也搞不明白）~~

PostgreSQL 的正则表达式可以使用 `%`。也提供了 `.*` 用于匹配任意内容。两者是等价的。

除此以外，还提供下划线 `_`，用来当占位符用，匹配任意字符。大概相当于常规正则当中的 `.`。

`\d` 用于匹配单个数字，`\s` 用于匹配空白；`\D` 表示非数字，`\S` 表示非空白。

`<xxx>{l,r}` 表示对于 xxx，至少匹配 l 个，最多 r 个。`<xxx>{l,}` 表示匹配至少 l 个。`<xxx>{y}` 表示匹配 y 个。

**注意，如果是用正则表达式，一定要加上：`^` 表示行首，`$` 表示行末！如果不加，可能会导致 LAB 出错扣分！**

`*` 是零个或多个，`+` 是一个或多个，`?` 是零个或一个。

### 非贪婪匹配

正则表达式默认是使用贪婪匹配的，即任何一个规则，它总是尽可能多地向后匹配

在正则表达式后面加上一个 `?` 可以表示非贪婪（non-greedy）匹配，即尽量少匹配呗。

可以参考廖雪峰的博客 [https://www.liaoxuefeng.com/wiki/1252599548343744/1306046731649057](https://www.liaoxuefeng.com/wiki/1252599548343744/1306046731649057)

## 大小写敏感（`~*` 和 `~`）

*   区分大小写：`~'<str>'`
*   不区分大小写：`~*'<'`

## 实用函数和关键字

*   `char_length(colName)`：顾名思义，字符串长度
*   `power(a, b)`：顾名思义，计算 $a^b$。
*   `log(x)`：计算 $\log_{10} x$。~~竟然不是以 e 为底，太奇怪了~~
*   `sqrt(x)`：$\sqrt{x}$。
*   `abs(x)`：$|x|$。
*   `pi()`：$\pi$。
*   `BETWEEN ... AND ...`，例如 `a between x and y` 意思是 $x \leq a \leq y$，而 `a not between x and y` 意思是 $a<x \vee="" a=""> y$
*   `... IN (...)`，跟 python 里面 `in` 比较类似，意思就是，前者是否在后者（数组）当中，例如：`col in (4,5,6)` 等价于 `(col = 4) or (col = 5) or (col = 6)`。</x>

## 列与列之间的比较（非静态值）

示例：找出所有 $A > B+C$ 的行（这里假设 ABC 都是数字类型）：

```sql
select * from tableName where (colA > colB + colC);
```

## 查询时显示计算值

示例

```sql
select *, colA*3, col2*4 from tableName;
```

效果：在后面显示了这几列

![](https://s2.loli.net/2023/03/18/4d2b5FwySBXlNpa.png)
