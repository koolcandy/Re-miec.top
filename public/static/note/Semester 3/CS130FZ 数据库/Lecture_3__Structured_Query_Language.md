
Lecture 3: Structured Query Language
====================================


SQL 语法
------


### 创建



```sql
CREATE TABLE <table name> (
    <column name> <data type> [(<size)] <column constraint>,
    ...
    <keys>);

```

其中，data type 有数种类型：


* `INTEGER`，有符号整数，可以跟上 `(size)` 表示最多有多少位
* `DECIMAL`，分数（浮点数），可以用 `(size1, size2)` 表示小数点前后分别多少位
* `REAL`，实数
* `BIT`，一串 bits
* `DATE`，日期
* `TIME`，二十四小时制时间
* `TIMESTAMP`，时间戳，日期和时间
* `CHAR`，必须跟上 `(size)` 表示长度，表示定长字符串
* `VARCHAR`，必须跟上 `(size)` 表示最大长度，表示不定长字符串


而 column constraint 是用来指定数据性质的。有数种类型：


* `UNIQUE`，表示列中每一行的数据都必须互不相同。用于 id 等信息
* `NOT NULL`，表示这一列不能含有 NULL 值
* `PRIMARY KEY`，这个属性是主键的一部分
* `REFERENCES <table name>`，这个属性是外键（指定 table 的主键）的一部分。
* `DEFAULT <data value>`，若插入的时候没有指定值，则赋值为默认值
* `CHECK <condition>`，每次修改这个值的时候，都会检查是否满足条件


至于 keys，就是 `PRIMARY KEY` 或 `FOREIGN KEY`


### 查找


`SELECT <column name1>, [<column name2>, ...] FROM <table name> [WHERE <expr>]`，相当于在 table 中找到所有满足 expr 的 column 并显示出来。


其中，expr 部分的表达式相当于筛选条件，可以用 `NOT`，`AND` 以及 `OR` 连接，以构造更完整的描述。


### 字符串


当使用 `STRING` 或 `VARCHAR` 的时候，要用单引号 `''` 括起来。而且字符串是大小写敏感的。然而，`Select` 之类的关键字是大小写不敏感的。


注意，数字不需要用引号。


