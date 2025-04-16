
Lecture 16\. REFERENTIAL INTEGRITY in JOINS, CASCADING DELETE and UPDATE operations 级联删除、级联更新和 JOIN 的参照完整性
==========================================================================================================


\~\~那天我在睡大觉，旷课了\~\~


内容很少，核心就一个要点：关于创建表的时候加上一句话



```sql
CREATE TABLE <tableNAME> (
    <col1> INT REFERENCES <table2>(col2) ON DELETE CASCADE ON UPDATE CASCADE,
    <col2> INT REFERENCES <table3>(col3) ON DELETE CASCADE ON UPDATE CASCADE,
    ...
)

```

这样就表示，这个表当中的 `<col1>` 和 `<col2>` 都是跟其他表当中的某个键级联的。


