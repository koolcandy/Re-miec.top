# Lecture 19. SQL Injection Attack and Types of JOINS in SQL 注入攻击与 Join 的种类

https://xkcd.com/327/

![xkcd comic](https://s2.loli.net/2023/03/29/Qh6cVDps8kbBoHX.png)

就是用户的表单输入内容，是 SQL 的语句的一个子串。如果开发者直接把输入内容扔给 SQL，那么用户的输入内容就有被运行的可能。

比如，在一个 web 页面当中，用户搜索一个产品名字，然后 Perl 查询 SQL 返回对应信息。假如 PHP 代码是这样写的：

```perl
$query = "SELECT info FROM table WHERE name = '<用户输入>';";
```

结果用户乱搞事儿，输入的不是正常的名字，而是输入了一个 `blabla' OR 'x' = 'x`（前后各缺了一个引号，正好跟 PHP 当中的引号补齐），那么就相当于产生了这样一条 SQL 语句：

```sql
SELECT info FROM table WHERE name = 'blabla' OR 'x' = 'x';
```

由于 `'x' = 'x'` 是满足的，所以这个 `WHERE` 永远真，于是整个表的内容都被返回了。

如果用户狠一点，知道了表的名字，输入了一个：`blabla'; DROP TABLE tableName; --`，其中 `--` 的作用是注释掉后面的内容（因为已存在一个引号，避免产生语法错误）。所以千万不要随便让其他人知道数据库的表名（比如通过一些错误日志）。

大坏蛋还可以通过注入攻击，实现 `INSERT` 和 `UPDATE`。比如创建一个管理员账号啊之类的。

## 防御

一个简单的方法，就是把用户输入的字符串改掉。

比如，每逢遇到 `'`，就改成 `\'`，如果遇到 `"`，就改成 `\"`。于是，用户输入的 `blabla' OR 'x' = 'x` 就变成了 `blabla\' OR \'x\' = \'x`，这样就不会永真了。

但是这个方法有缺陷。比如加入用户构造了一个 `1 = 1`，那就无法防范。

更进一步的防范方法有：

*   检查用户输入内容是否合法，比如邮箱、手机号、日期等
*   增添输入长度限制
*   最好禁用掉引号和分号（但是假如有人名字叫做 O'Reilly，可以仅允许最多一个引号）
*   检查输入内容是否包含 SQL 关键字（`INSERT`，`DROP` 等）
*   把从 SQL 里查表单的 PHP 登录的角色改成只读的（永远不要用管理员账号连接数据库）
*   永远不要把数据库报错信息显示给用户

### prepared queries

最推荐的方法是：使用 bound variables 或 prepared statement。即把输入内容绑定到变量。如：

Perl 示例：

```perl
$sth = $dbh->prepare("SELECT email, userid FROM members WHERE email = ?;");
 # 上面的问号表示一个占位符 placeholder。第一个 ? 表示第一个变量，以此类推。
$sth->execute($email);
 # $email 是表单提交的值，然后传递给 #1 变量。
 # 即使字符串存在奇怪的东西（比如 OR 1=1），也仅仅是字符串，而不代表逻辑条件。
```

Java 示例：

```java
PreparedStatement ps = connection.prepareStatement("SELECT email FROM member WHERE name = ?");
ps.setString(1, formField);
ResultSet rs = ps.executeQuery();
```

## join 的种类

之前接触过的所有的 join 都是默认的，inner 的

*   inner
*   left
*   right
*   full
*   self
*   cartesian

知乎上看起来有一个不错的解析 https://zhuanlan.zhihu.com/p/59656673

## inner join 的改写

```sql
SELECT *
    FROM food as F INNER JOIN likes AS L ON (F.foodid = L.foodid)
                   INNER JOIN persons AS P ON (P.personid = L.personid);
-- 注意，这种写法不含 WHERE 从句
```

## left out join

效果是，先做完 inner join，然后再从左边表当中找出没有 match 成功的，把这些接着列出来，右边留空白。

right join 什么的，类似。
