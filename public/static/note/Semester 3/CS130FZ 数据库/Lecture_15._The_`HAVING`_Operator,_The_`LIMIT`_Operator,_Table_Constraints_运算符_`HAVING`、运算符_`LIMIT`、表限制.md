
Lecture 15\. The `HAVING` Operator, The `LIMIT` Operator, Table Constraints 运算符 `HAVING`、运算符 `LIMIT`、表限制
========================================================================================================


\~\~那天我在睡大觉，旷课了\~\~


`HAVING` 语法
-----------



```sql
SELECT <colName>, <aggFunc()>
    FROM <tableName>
    [WHERE <condition>]
    GROUP BY colName
    HAVING <aggFunc()> <condition>
    [ORDER BY <colName> <option>]

```

`HAVING` 是用来给 `GROUP BY` 得到的东西设置限制的。


注意，假如有 `COUNT(*) AS cnt`，`HAVING` 里面不能写 `cnt`，还得写 `COUNT(*)`。这是一个语法问题：`HAVING` 里面必须要包含 agg 函数。


`LIMIT` 语法
----------


`LIMIT` 是用来限制返回的数量的。比如不想返回全部数据，只想看前 10 行数据，就可以用 `LIMIT` 关键字（配合 `ORDER BY` 使用）。为了保证每一次相同的询问都返回同样的数据，必须配合 `ORDER BY`，也就是保持 consistency。


限制（`CONSTRAINT`）
----------------


在创建表的时候，之前已经见过关于主键的限制了。现在来介绍关于值的限制：



```sql
CREATE TABLE <tableName> (
    <col1> INT NOT NULL,
    CONSTRAINT <tableName>_pkey PRIMARY KEY (<col1>),
    CONSTRAINT <consName> CHECK (<col1> > 10)
)

```

像这个 `CREATE` 最后的 `CONSTRAINT` 意思就是限制这一列所有的值，必须大于 10\. 如果插入、修改的时候不满足这个限制条件将会报错。


