
Lecture 18\. Tables as Sets in SQL 表集合
======================================


主要讨论五个方面：


* `ALL`
* `DISTINCT`
* `UNION`：集合并
* `EXCEPT`/`MINUS`：集合差
* `INTERSECT`：集合交


有时候的 SQL 查询结果当中会有一些重复的东西，比如查询一堆人的工资，虽然人与人的名字之类的可能不一样，但是如果我只查工资，可能有好几个 5000 的，好几个 6000 的。


`DISTINCT` 关键字
--------------


如果想要在询问结果中消除掉重复的数据，只需要在 `SELECT` 语句的里面加上一个 `DISTINCT`：



```sql
SELECT DISTINCT salary FROM tableName;

```

如果 `DISTINCT` 后面由两个列名的话，那么考虑的是所有列构成的 tuple 去重，而不仅仅是紧跟在 `DISTINCT` 后面的那一个：


![image-20221125105613900](https://s2.loli.net/2023/03/18/73zUs1eTFQfbyD2.png)


集合操作
----


### `UNION`


之前关于查询级联删除影响多少行的时候，已经使用过 `UNION`。这里展示 `UNION` 的另一种用法（并集）：


![image-20221125110106765](https://s2.loli.net/2023/03/18/ZOaRSFGdBbJhvfX.png)


根据题意，第一个查询是关于 manager 的，第二个查询是关于 worker 的。


### `ALL`


这个关键字与多重集（multiset）有关。


![image-20221125112242886](https://s2.loli.net/2023/03/18/wXog1z8NYhjGVl9.png)


参照完整性
-----


这部分在课件上就是几张手绘图。


永远要记得外键的重要性。外键必须是另一个表里面存在的主键。违反参照完整性的操作（插入、删除等）将会触发错误。


