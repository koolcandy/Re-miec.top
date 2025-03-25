# Lecture 13. Deleting and Altering Data in a Database 删除和修改数据

## `DELETE` 语句

类似 `SELECT`，如果不用 `WHERE`，那么就会删除所有的记录（只是删除记录内容，不会销毁表的结构）。如果用了 `WHERE`，就只有满足条件的才会删除。

所以，除非是故意要清空一张表，否则不要随便直接无条件的 `DELETE`。

```sql
DELETE FROM <tableName> WHERE <conditions>;  # 删满足条件的
DELETE FROM <tableName>;                     # 全部删除
```

与 `SELECT` 不同的是，`DELETE` 一次仅删除一张表的数据。

为了避免不小心 `DELETE` 掉错误的数据（比如 `WHERE` 里面出现笔误），可以先执行一遍同样条件的 `SELECT *`，确保条件无误之后再删除。

## 数据恢复

有充分的备份的情况下，是有可能成功实现数据恢复的。

在一段事务（Transaction）当中执行的语句，可以被 `ROLLBACK`：

```sql
BEGIN;
    # blabla
ROLLBACK;
```

## `UPDATE` 命令

会把满足 `WHERE` 条件的所有行，都改成指定的值。

```sql
UPDATE <tableName>
    SET
        <colName1> = {<expr1>},
        <colName2> = {<expr2>},
        <colName3> = {<expr3>},
        ...
    [WHERE <coldition>];
```

当然也可以把值更改为 `NULL`。

注意：如果要用 `WHERE` 查找 `NULL` 值，不能用「等于」，而要用 `IS NULL`。
