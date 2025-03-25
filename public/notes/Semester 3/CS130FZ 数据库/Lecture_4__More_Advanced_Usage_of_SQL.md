# Lecture 4: More Advanced Usage of SQL

## 几个好用的关键字

*   `count()` 表示返回的结果（result set）一共有多少行。
*   `order by <column name> <method>`  表示对于返回的结果，以这一列为关键字排序，method 表示按照什么方式排序，可选的有：`asc`，`desc` 等。

## 字符串的模式匹配（Pattern Matching）

上面说到过，字符串是大小写敏感的。假如数据库存储的是 'A'，那么查询 'a' 就会查不到。

`LIKE` 关键字可以用于实现模式匹配。如：`where <col name> LIKE 'A%'`表示查询所有以 'A' 开头的字符串。其中，`%` 表示匹配任何内容（通配符），可以为空。类似地，`%B` 表示所有以 'B' 结尾的字符串，`%C%` 表示任意包含子串 'C' 的字符串。注意，如果要进行模式匹配，不能用 `=` 连接。
