
Lecture 9\. Data Security, DA, DBA 数据安全与管理
==========================================


数据完整性 data integrity
--------------------


好像也有的地方管这个东西叫做「一致性」。


数据完整性分为三类：


* Intrarecord integrity，记录内完整性（对字段内容等实施约束）
* Referential Integrity，参照完整性（强制执行数据库中记录之间参照的有效性）
* Concurrency control，并发控制（确保共享多用户环境中数据库更新的有效性）


### 完整性限制


* required data 所需数据
* attribute domain constraint 属性的值域
* entity integrity 实体完整性
* referential integrity 参照完整性


### Referential constraint 参照的限制


示例：



```sql
CREATE TABLE tableName (
    attr1 type1 PRIMARY KEY,
    attr2 type2 NOT NULL,
    ...,
    attrN, typeN REFERENCES anotherTableName(attrName) ON DELETE CASCADE, 
    ...
)

```

这样写的具体作用以后再说。


### 并行控制


是为了支持多用户同时访问相同数据。


必须确保操作是可序列化的，且相互分离的。


有几种锁的等级。数据库（db）、表（table）、块或页（block/page）、记录（record）、字段（field）。


锁也分为 Shared（S 锁）和 Exclusive（X 锁）两种类型。


### 事务控制


*事务（ Transaction）* 由一次或者多次基本操作构成，或者说，事务由一条或者多条 SQL 语句构成。 事务有一个最显著的特征，就是它包含的所有 SQL 语句作为一个整体向数据库提交，只有所有的 SQL 语句都执行完成，整个事务才算成功，一旦某个 SQL 语句执行失败，整个事务就失败了。


代码中，事务是由通过 `BEGIN TRANSACTION` 开始的，后面跟着一些 SQL 语句，最后由 `END TRANSACTION` 结束。


对 SQL 进行任何修改之后，都应当执行 `COMMIT` 操作，即确认前面的事务。


有的事务可以使用 `ROLLBACK` 撤销。


示例：



```sql
COMMIT;
BEGIN TRANSACTION;
SELECT ...;
SELECT ...;
COMMIT;
END TRANSACTION

```

安全管理
----


### 视图 views


视图的意思大概是指，数据库中的某些内容，节选出来给某些用户查看。实现代码：



```sql
CREATE VIEW viewname AS
    SELECT filed1, field2, field3, ..., FROM table1, table2
    WHERE xxxxxxxxxx;

```

### 权限规则 Authorization rules


很多 DBMS 都允许 DBA 在 SQL 当中通过 `GRANT` 或者 `REVOKE` 命令来定义数据表的访问权限。



```sql
GRANT ALL ON TABLE <tableName> TO <groupNameOrUserName>;
GRANT SELECT ON TABLE <tableName> TO <groupNameOrUserName>;

```

像这样，就可以给指定的用户或组在指定的数据表上，分配指定的权限，可以是全部权限，也可以是仅有某些权限。


数据库管理：灾害、备份和恢复 disaster，backup，recovery
---------------------------------------


数据库可能会遭受水灾、火灾、停电、软硬件故障、黑客攻击等，从而丢失数据。甚至有时候用水救火引发双重灾难。


数据库的记录，可以分成四个等级：vital（非常重要），important（重要），useful（有用），nonessential（无关紧要）。


可以通过建立镜像存储、委托企业帮助进行存储等方式进行备份和恢复。


数据库管理：用户权限 roles
----------------


一些术语和概念
-------


* 数据管理：负责整个数据资源的管理
* 数据库管理：负责物理数据库的设计，以及技术问题方面
* DA，数据管理员（data administrator），负责数据管理
* DBA，数据库管理员（database administrator），负责数据库管理


通常，DA 和 DBA 都是以团队形式运作的。


### 数据库系统的生命周期（life cycle）


![image-20221014103206241](https://s2.loli.net/2023/03/18/tYA9JwxWEOBMbXH.png)


对于大型数据库，要 think big。


### 数据库规划 database planning


就是设计一个全面的规划，做出一个企业的数据模型，主要由 DA 负责。


DA 在这个阶段，要做的工作有：设计数据库策略、企业模型、代价/利润模型、搭建数据库环境、做出管理计划。


### 数据库分析


是一个确认数据库 entity 和 relationship 的过程，并撰写文档以备后续工作的过程。顺便要考虑一下可能未来要新加入的元素或者未来的变化。最终构造出一个概念模型，也就是 ER 图。


DA 主要负责这个阶段。DA 需要完成定义模型的数据需求、模型的商业规则，以及完成定义操作需求，同时维护公司的数据字典（data dictionary）。


*数据字典（data dictionary）* 是一个自动的或手动的存储数据元的定义和属性的文档。 指一组对数据流程图中的数据流、数据文件、数据项及处理逻辑进行定义描述的表格。


### 数据库设计


主要是数据库的逻辑设计以及为了实现相应逻辑设计所需的物理模型设计。


物理模型，差不多就是需要搞清楚：用什么数据库、数据的格式和类型是啥、索引怎么确定之类的。然后弄出一个数据库的初步雏形出来进行测试。不仅如此，还要实现安全、隐私、权限的控制和完整性限制。


这个阶段 DA 的工作比较少，主要是逻辑数据库的设计。DBA 的工作量比较大，DBA 要弄好外部模型（external model）、内部模型（internal model），还要弄好完整性控制。


### 数据库实现


数据库设计好之后，一个空的数据库就诞生了。接下来，要把数据统统导入到数据库里面去。


DA 和 DBA 在这个阶段，都要一起弄好数据库的访问权限政策，还要引导用户怎么用。


DBA 还要：建立安全控制工作、监督数据导入工作、明确测试流程、设计应用程序标准、建立备份和恢复的流程……


### 数据库操作和维护


用户会需要更新数据库，而 DA 和 DBA 要在用户操作的时候，确保完整性和安全性。


Quality assurance must be practiced to protect and audit the database quality（必须实施质量保证以保护和审计数据库质量）。


数据库进行操作和维护的时候，隐私、安全、访问控制要格外留意。备份和恢复的方法步骤也需要明确建立。


这个阶段，DA 和 DBA 都需要提供用户支持。DBA 还要监视数据库的性能（database performance），有时候要对数据库进行调整，还要强制保证标准流程。数据库的性能需要保持在比较高的水平。


### 数据库的成长与改变


DA 和 DBA 需要：实现修改的流程、为以后的扩大和改变做计划、评测新的技术……


小结
--


这节课是关于企业级数据库的，在实际应用当中比较重要。


数据安全、数据和数据库的管理，DBMS 当中非常重要。


