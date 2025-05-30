# Lecture 6. Random Testing and Error Guessing

## 随机测试

*   均匀分布（uniformly distributed）的数据，常用于单元测试（unit test）。
*   统计分布的测试数据，常用于系统测试（system test）（比如正态分布（normal distribution））
*   `Random.nextInt(x)` 返回 $[0, x)$ 的随机数
*   `Random.nextGaussian() * sd + mean`，返回平均值 mean、方差 sd 的正态分布随机数
*   在极值和非法值方面的测试，可能会不充分

## 错误猜测

大概就是找一个 acm 金牌选手，听到 acm 入门选手的一个错误之后，根据经验，猜测一下，你是不是 xxx 没特判~

有时候，大神一猜就中；有时候，大神一下子也看不出来。

所以，这是一种 ad-hoc 的方法！

## 黑盒测试小结

目前已经学过的测试方法有：

*   等价类测试 EC，假设一个等价类的一个测试点通过了，这个等价类的所有测试点就都能通过
*   边值测试 BV，基于等价类，测等价类的边界值，所以比等价类强一点点
*   组合测试，就感觉是把输入数据的组合情况列出来，然后再化简一些
*   随机测试，
*   错误猜测
