
Lecture 7\. Creating Tables and Inserting Data in PostgreSQL 创建表和插入数据
=====================================================================


数字类型（本课程中常用）
------------


* `integer`，四字节整数
* `smallint`，二字节整数
* `numeric`，精确的浮点数。小数点前可以有 131072 位，小数点后可以有 16383 位。
* `real`，四字节浮点数（单精度）
* `double precision`，八字节浮点数（双精度）
* `serial`，四字节自增量，从 1 到 2147483647，完全由 PostgreSQL 控制。使用 `insert` 语句的时候，无需指定类型为 `serial` 的属性的值，PostgreSQL 会自动分配。


字符串类型
-----


需要用**单引号**括起来


* `varchar(n)`，不定长字符串，最大长度 n
* `char(n)` 定长字符串
* `text` 无限长度，可以用于存储博客文章内容等数据


并不是所有的字符串全都用 `text` 就是最好的。比如，对于姓名等数据，我可以要求限长 20，这样就可以让数据库自动检测出哪些 `INSERT` 之类的输入了非常长的不合法的假名字。同时，限长或定长的字符串，还可以用来辅助估计这个数据库的字节大小。


`constraint` 语句
---------------


DDL 语言中，只要是 `Create Table` 指令，就一定要有 `constraint` 语句出现。


示例：



```sql
CREATE TABLE mymoviews (
    moviename varchar (200) NOT NULL, 
    movieminutes integer NOT NULL,
    movierating real NOT NULL,
    movieguide varchar (20) NOT NULL,
    CONSTRAINT mymoviews_pkey PRIMARY KEY (moviename)
)

```

可以看到，`constraint` 的语法格式大概是：`constraint <table name>_pkey PRIMARY KEY(column name)`。其中，主键的表示格式是表名直接接上 `_pkey`。


`INSERT` 的用法
------------


大概作用是，插入**一行**数的据。不是插入新的列。



```sql
INSERT INTO <tableName> (<column list>) VALUES (<value list>);

```

注意，这里的顺序最好和 create 的时候一致。


示例：



```sql
INSERT INTO mymovies
    (moviename,movieminutes,movierating,movie guide)
    values (Interstellar',169,8.7,'PG 13');

```

插入完所有的行之后，可以通过 `select *` 或者右键选择「view all rows」查看整张表的数据，


若插入新行的时候，如果指令出现了之前有过的 primary key，则插入语句不生效。


`Drop table` 命令
---------------


`drop table` 属于 DML，可以把整张表的数据删除。删除之后就可以重新 create 一个名字一模一样的表。


注意，一旦执行了 `drop table`，是无法撤销的。


通常，`drop table` 通常与 `if exists <tableName>` 结合使用，如：



```sql
drop table if exists <tableName>;

```

如果不使用 `if exists`，并在不存在这个表的时候尝试 drop，可能会导致抛出异常的情况发生。


创建表的步骤
------



```sql
/* Step 1 */
DROP TABLE IF EXISTS <tableName>;

/* Step 2 */
CREATE TABLE <tableName> (
    ...,
    ...,
    ...
);

/* Step 3 */
INSERT INTO <tableName> (..., ...) VALUES (..., ...);

```

