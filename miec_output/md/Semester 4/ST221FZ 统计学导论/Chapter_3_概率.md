# Chapter 3 概率

## 样本空间与事件 Sample Spaces and Events

样本空间一般用花体字母 $\mathcal{S}$ 表示。可以分为离散样本空间、连续样本空间。

样本空间的任何子集，叫做事件。当然空集 $\emptyset$ 也是子集，算一个事件。

*互斥事件 mutually exclusive event*，就 **看交集是不是空集**。是空集就互斥了，$A$ 发生则 $B$ 不可能发生。

## 排列组合

$$_nP_r = P_n^r = \frac{n!}{(n-r)!}\qquad 1 \leq r \leq n$$

$$_nC_r = C_n^r = \left(\begin{array}{l}n \ r\end{array}\right) = \frac{n!}{r!(n-r)!}\qquad 1 \leq r \leq n$$

## 公理和定理

### 公理

对于 **有限集** 的样本空间 $\mathcal{S}$：

*   $\forall A \in \mathcal{S}, 0 \leq P(A) \leq 1$
*   $P(S) = 1$
*   若 $A$ 与 $B$ 是 $\mathcal{S}$ 当中的 **互斥** 事件（$A \cap B = \emptyset$），则 $$P(A \cup B) = P(A) + P(B)$$

    *   推论：若 $A_1, A_2, \cdots, A_n$ **两两互斥** 的，则它们当中至少发生一个的概率，等于所有概率之和 $$P(A_1 \cup A_2 \cup \cdots A_n) = P(A_1) + P(A_2) + \cdots + P(A_n)$$

### 定理

*   对于 **任意两个事件**（不要求互斥）（$A \cap B \not= \emptyset$)，$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$，可以结合韦恩图辅助理解。
*   $P(\overline A) = 1 - P(A)$
*   德摩根：$\overline{A \cup B} = \overline A \cap \overline B$，$\overline{A \cap B} = \overline A \cup \overline B$

## 条件概率 conditional probability

若 $A, B \in \mathcal{S}$ 且 $P(B) \not= 0$，则已知 $B$ 的情况下 $A$ 发生的概率（the conditional probability of $A$ given $B$）记作 $P(A|B)$，$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
如果知道了条件概率，也可以反推他们交的概率（其实就是相当于把分母挪走了）。$$P(A \cap B)= \begin{cases}P(A) P(B \mid A) &amp; \text { if } P(A) \neq 0 \\ P(B) P(A \mid B) &amp; \text { if } P(B) \neq 0\end{cases}$$

### 独立事件

若 $A, B$ 相互独立，当且仅当 $P(A|B)=P(A)$，或 $P(B|A)=P(B)$。

也有的地方说 **独立** 事件的定义是，$$P(A \cap B) = P(A)P(B)$$，这两种不同写法是等价的。

独立意味着条件概率没有意义了，也就是两个事件没关系的意思。

有的题目当中，是否独立需要算算；也有的题目当中，是否独立需要根据实际生活i经验判断。

注意，独立事件和互斥事件是两码事 https://zhuanlan.zhihu.com/p/53736521。

> 如果事件 $A$ 和事件 $B$ 发生的概率都不为 $0$，那么独立和互斥有这样一层关系：**互斥不独立，独立不互斥**。可以这样理解：互斥是指 A 发生则 B 必不发生，这相当于一种特殊的关系，所以他不能算是「独立」。
>
> 零概率事件与任何事件独立；$1$ 概率事件与任何事件独立。
>
> 不可能事件与任何事件既独立又互斥（零概率事件与不可能事件是不同的）

## 贝叶斯公式 Bayes' Theorem

### 全概率公式 rule of total probability

若 $B_1, B_2, \cdots, B_n$ 互斥且至少有一个必定发生（$\bigcup_{i=1}^n B_i = \mathcal{S}$），则 $$\boxed{P(A) = \sum_{i=1}^nP(B_i)\cdot P(A\mid B_i)}$$，这两坨相乘相当于求交的概率。

### 贝叶斯公式

Bayes' theorem provides a formula for finding the probability that the “effect” A was “caused” by the event $B_r$.

贝叶斯公式由果推因。$$\boxed{\begin{aligned}P\left(B_r \mid A\right) &amp;= \frac{P(A \cap B_r)}{P(A)} \\ &amp;= \frac{P\left(B_r\right) \cdot P\left(A \mid B_r\right)}{\sum_{i=1}^n P\left(B_i\right) \cdot P\left(A \mid B_i\right)}\end{aligned}}$$
贝叶斯公式的分母，就是全概率公式。
