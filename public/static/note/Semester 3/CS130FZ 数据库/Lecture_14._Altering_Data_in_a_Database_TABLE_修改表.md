
Lecture 14\. Altering Data in a Database TABLE 修改表
==================================================


`DROP`：销毁表
----------


通常的用法是



```sql
DROP TABLE IF EXISTS <tableName>

```

这样做不仅会清空表的数据，还会销毁表的结构


`ALTER TABLE`：修改表
-----------------


### 表改名



```sql
ALTER TABLE <tableName> RENAME TO <newName>;

```

改名前，可以用 `SELECT FROM <tableName>` 查找数据，改名后就只能用 `SELECT FROM <newName>` 了。


表的改名要非常谨慎，因为改名后之前 join 的结构完整性可能会遭到破坏。


### 列改名



```sql
ALTER TABLE <tableName> RENAME COLUMN <oldColName> TO <newColName>;

```

### 删除列



```sql
ALTER TABLE <tableName> DROP COLUMN <colName>;

```

该操作不可撤销。


### 新增列



```sql
ALTER TABLE <tableName> ADD COLUMN <colName> <colType>;

```

### 修改列的类型



```sql
ALTER TABLE <tableName> ALTER COLUMN <colName> TYPE <newColType>;

```

修改后的类型必须兼容已有的数据才行，比如 `VARCHAR(10)` 可以修改为 `VARCHAR(20)`。


### 增设主键（原本没有）



```sql
ALTER TABLE <tableName> ADD PRIMARY KEY <colName>;

```

