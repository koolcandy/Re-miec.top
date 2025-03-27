# Lecture 10. Working with Primary Keys 主键的使用

## 键的层次分类

*   *super key 超键*: 是一个关于属性的集合，集合中可以有一个或多个属性。这个属性集合可以唯一的确定一个实体、行或表。a set of one or more attributes, which, when taken collectively, allows us to identify uniquely an entity, row or table.
*   *candidate key 候选键*: 候选键是超键的子集，是不包含多余属性（not reducible）的超键。any subset of the attributes of a super-key that is also a super-key, but not reducible
*   *primary key 主键*: 是从候选键当中任意选出的一个键，可以用作索引。arbitrarily selected from the set of candidate keys, as needed for indexing。
*   *唯一键 unique key*，唯一键用于确保所有属性互不相同。因此，主键是唯一键，但唯一键不是仅有主键。
*   *复合键 composite key*，由两个或更多的属性组合而成，可以用于唯一标识表中的行。

## 主键的选择

*   主键永远都不能是 `NULL` 值
*   主键的值应当在被创建的时候就指定了
*   主键的值一旦确定，不应被更改，也不应换别的属性作为主键
*   主键应当尽量精简，不要弄一个特别大的超键来当主键
*   每个实体或表当中，仅能有一个主键

### 人工主键（artificial primary key）

人工主键，就是完全是为了数据库，特意制造出来的唯一的东西。比如，序号（id）。通常这些东西都是由数据库或者其他应用程序自动生成的。

PostgreSQL 当中的 `serial` 类型数据，自增，可以实现这个需求（自动生成唯一的 id，从 0 到 INT_MAX）。Lecture 7 的开头提到过这个数据类型。

### 自然主键（natural primary key）

自然主键，顾名思义，就是在自然世界当中存在的东西。比如学号呀，银行卡号呀、车牌号呀、时间戳（足够的精度）呀、ISBN 书号呀之类的。但是，随机数、姓名、日期、精度不足的时间戳，不适合用作主键。

#### IBAN 国际银行卡号

爱尔兰好像用这个东西。卡号最多是 34 位数，格式是：

*   前两位，根据 ISO 3166 标准制定的该银行所在国家的编码，比如 IE、CN 之类的
*   然后两位，是控制键（control key）
*   接下来最多 30 位，表示银行的编号，以及在这个银行下这个账户的编号
