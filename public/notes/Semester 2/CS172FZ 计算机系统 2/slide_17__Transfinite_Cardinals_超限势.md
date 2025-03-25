# slide 17: Transfinite Cardinals 超限势

上一讲提到，集合 $\mathbb{N}$，$\mathbb{Q}$，$\mathbb{Z}$ 的势都是 $\aleph_0$。当然，并不是所有的无限集，势都是 $\aleph_0$。

## 实数集 $\mathbb{R}$ 的势

康托尔证明了，实数集 $\mathbb{R}$ 是不可数的，即 $\# \mathbb{R} \not= \aleph_0$。

要证明 $\# \mathbb{R} \not= \aleph_0$，只需证明：
- $\#{r \in \mathbb{R} \mid 0 \leq r \leq 1} \not= \aleph_{0}$
- $\#{r \in \mathbb{R} \mid 0 \leq r \leq 1}=\# \mathbb{R}$

设 $A = \{r \in \mathbb{R} \mid 0 \leq r \leq 1\}$，假设 $A$ 是可数集，那么，必须有枚举排列 $A$ 的元素的的方法存在才行。但是，并不存在这种枚举法，因为：假如有了一个数字 $x$，只要把每一位都加上 1，就可以得到一个新的数字。你并不知道这个新数字的顺序应该是什么……

故，$A$ 不可数。第一条证明完毕。接下来证明第二条。

$A$ 和 $\mathbb{R}$ 是双射的话，他们俩就是等势的。$\tan(x)$ 恰好在 $(-\frac{\pi}{2},\frac{\pi}{2})$ 上能构成双射。第二条证明完毕。

康托尔使用的证明方法，叫做对角线证明法 diagonalization。这种方法已经成为非枚举领域证明的基操。

## 连续统 continuum

连续统，是指连续不断的数集。如，实数集的一个子集。

连续统的势，顾名思义。通常写作 $\mathfrak{c}$，哥特体的小写字母 c。

## 康托尔定理 Cantor's Theorem

任何集合的势，都严格小于其幂集的势。即：$\operatorname{card} (S) < \operatorname{card} (\mathbb{P}(S))$。证明略。

因此，数列 $\operatorname{card}(\mathbb{N}), \operatorname{card}(\mathbb{P}(\mathbb{N})), \operatorname{card}(\mathbb{P}(\mathbb{P}(\mathbb{N}))), \operatorname{card}(\mathbb{P}(\mathbb{P}(\mathbb{P}(\mathbb{N})))), \ldots$ 递增。

这玩意儿叫做超限数，transfinite number，也简写为 transfinites。

## 结论：$\operatorname{card}(\mathbb{R}) = \mathfrak{c} = 2^{\aleph_0} = \operatorname{card}(\mathbb{P}(\mathbb{N}))$

先试着证明一下。

简化问题，不考虑实数集的势，考虑 $[0,1)$ 的所有实数构成的集合的势。任意取出一个数字，用二进制来表示，如 $r=0.01010111010101000101$。

创建一个空的集合 $S$，若 $r_i$ 是 $1$ 则将 $i$ 插入集合中去。最终，$S$ 是自然数集幂集的一个元素，即 $S \in \mathbb{P}(\mathbb{N})$。

故，任意一个 $[0,1)$ 范围内的实数，都有一个与之对应的 $S$ 是自然数集幂集的元素。因此，$[0,1)$ 内所有实数构成的集合，与自然数集幂集构成双射。

结论得证。

## 小结

*   实数集是不可数的。
*   任何集合的势，都严格小于其幂集的势。
*   实数集的势，等于自然数集的幂集的势。

## 连续统假设 The Continuum Hypothesis

比自然数集 $\mathbb {N} =\{0,1,2,3,4,...\}$ 基数大的集合中，基数最小的集合是实数集 $\mathbb{R}$，即：$\operatorname{card}(\mathbb{N})$ 和 $\operatorname{card}(\mathbb{R})$ 中间，不存在超限数。
