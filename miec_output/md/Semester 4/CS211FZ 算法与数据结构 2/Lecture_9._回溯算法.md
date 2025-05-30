# Lecture 9. 回溯算法

一般来说，回溯是穷举搜索的一种实现方式，性能也不咋滴，但是可以加入 *剪枝（pruning）* 等手段来进行优化。

## 收费公路重建问题 The Turnpike Reconstruction Problem

在一个坐标轴上有 $n$ 个点 $p_i$，每个点距离原点 $x_i$，设第一个点的坐标 $x_1 = 0$

一共产生了 $\frac{n(n-1)}{2}$ 个点对。这些点对可以产生 $O(n^2)$ 个两两之间的距离

收费公路重建问题就是，给你这 $O(n^2)$ 个点对距离信息，让你把这些点的坐标重构出来（只是重构每个点相对第一个点的距离）。

这个问题现在没有多项式时间的做法。回溯剪枝可以跑到 $O(n^2 \log n)$ 的级别，但是最坏情况下也能卡到指数级别。

假设拿到的距离信息数组 $D$ 已经升序排序了。可以根据 $D = \frac{n(n+1)}{2}$ 算出 $n$ 是多少，也可以直接用最大的距离得知最远的点在哪里。

然后不断地从这个数组里面拿最大的去检查。看看把这个最大值塞到哪里去。如果不能塞（矛盾），就不塞；如果能塞，就继续 dfs。

由于每次塞，都会至少减少一个 $D$ 的元素，所以如果不回溯不剪枝，也最多是 $O(n^2)$ 步。好像有人证明过，如果数据比较随机且范围不大，这个算法就回溯最多一次，所以整体来说基本上就是 $O(n^2\log n)$ 级别的。
