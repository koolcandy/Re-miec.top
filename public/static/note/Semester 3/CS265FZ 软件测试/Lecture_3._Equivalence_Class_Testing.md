
Lecture 3\. Equivalence Class Testing
=====================================


JUnit 测试框架
----------


上机课需要用。


### 实用方法


* `assertEquals(val1, val2)`


### 参数化测试


* `@DisplayName("TestName")`
* `@ParameterizedTest`
* `@CsvSource(resources="file.csv")`


### 等价类设计示例


![](https://s2.loli.net/2022/11/10/73LN2e5shzj49ET.png)


* 第一列标注星号的，表示无效等价类通常是取值不合法或高达无穷的。输入的无效等价类需要单独测，也就是说一组测试数据的输入中不能同时包含两个星号等价类。
* 第三列 partition，对于 bool 类型，取值是 true/false，而 int 应该填写取值范围（区间）


### 小注记


* 每个新的测试点，都尽量多的覆盖未被测试的等价类
* 有几种输出，就至少需要有多少个测试数据


