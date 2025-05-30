# Lecture 4. Boundary Value Testing

## 概述

假如等价类是 [1,100]，代码仅在边界处会有问题，而测试随便挑了一个 50 当作测试数据，就测不出来这个问题。

通常 BV 测试的输入数据，如果是离散的，会选择边界值及其 ± 1 的位置的三个值当中的两个；如果是连续的，则稍微挪一下精度。

BV 测试强于 EC 测试，因为 BV 是从 EC 转化而来的，且 EC 是中间选一个值，BV 是边界两个都测了。

与 EC 测试类似，每个标注星号的（无效）都要被测试，且一个数据只能测一个。

## 优点

- 比较适合输入数据是范围或集合的情况
- 单元测试、集成测试，系统测试，验收测试，都可以使用
- 测试数据需求较少，虽然比等价类多一点
- 无需考虑输入的组合（如输入日期年月日的组合），这种情况下等价类很难划分

## 划分和测试数据示例

每个边界的位置，取两个作为测试点（L，R）。
![image-20221016125506541](https://s2.loli.net/2022/11/10/aCiGPlZedIj83mK.png)

另一个例子。几个年龄区间分别是：$(-\infty, -1], [0,2], [3,16], [17, 30], [31, 45], [46, 150], [151, \infty)$，那么每个区间都要同时取左右端点，设计测试数据要如下表。

![image-20221016131048380](https://s2.loli.net/2022/11/10/ozgwscaUWqeZMXO.png)
