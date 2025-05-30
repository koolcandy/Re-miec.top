# Lecture 11. Dataflow Coeverage 数据流覆盖

（睡过了）

## Data flow anomaly 数据流异常

*anomaly* 是指不寻常、错误的行为。比如：变量未定义却使用、定义却未使用、重复定义等。

## 数据流测试 dataflow coverage

数据流测试，是看变量在哪里赋值以及在哪里使用。

数据流测试旨在验证所有的数据流（路径），覆盖掉所有的数据的赋值、使用路径。这里的赋值称为 D（Definition），而使用称为 U（Use）。而 D 到 U 之间的每一条可能的路径，就叫做 DU-pair。

数据流测试希望覆盖掉所有的 DU-pair。

变量的使用分为两种情况，一种叫做 predicate-use（P-use），指的是在条件判定语句当中；另外一种叫做 computation-use（C-use），只要不是 P 就认为是 C。

## 清晰的定义路径 DefinitionClearPath

清晰的定义路径是指，在变量 x 的一对 DU-pair 路径中，不存在 x 的重新定义。

## 测试数据设计

枚举每一条 CFG 上的路径，找出这个路径上所有的 DU-pair。注意如果有变量被重复定义，那离得远的那一对就不能算了（比如第三行第五行都有定义，第六行使用，那么应该在只算 (5,6) 这个 pair）。

## 小结

强大的测试方法。但是找出所有 DU-pair 非常浪费时间。假设有 $N$ 个变量，每个变量定义 $d_i$ 次，使用 $u_i$ 次，那么总共需要 $\Sigma_1^N d_i \times u_i$ 个测试数据。

对于引用类型、指针类型等数据比较难处理。数组也比较难处理，通常把整个数组当成单一的变量。

越靠上的测试方法越强。
![image](https://s2.loli.net/2022/12/27/KyW8IsPS9YUqvVR.png)
