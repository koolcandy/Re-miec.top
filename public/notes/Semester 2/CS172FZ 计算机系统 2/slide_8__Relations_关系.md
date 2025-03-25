# slide 8: Relations 关系

## 笛卡尔积 Cartesian Product

集合 $A$ 与集合 $B$ 的笛卡尔积，表示为 $A \times B$，就是所有二元组 $(a, b)$，其中 $a \in A$ 且 $b \in B$。

即：$A \times B = \left\{ a \in A, b \in B \bullet (a, b) \right\}$。

$A \times B$ 中元素的个数 $\operatorname{size}(A \times B) = \operatorname{size}(A) \times \operatorname{size}(B)$。

**笛卡尔积不满足交换律和结合律**。但是笛卡尔积对于集合的交并满足分配律。

## 用集合定义关系

*   若给定两个集合 $A$ 和 $B$，那么 $A$ 与 $B$ 之间的二位关系，就是 $A \times B$ 的子集。
*   若给定三个集合 $A, B, C$，那么它们之间的三元关系就是 $A \times B \times C$ 的子集。
*   以此类推 $\dots$

## 关系的组合（Composing 2 relations）

给出三个集合 $A, B, C$，以及两个关系 $R \subseteq (A \times B)$ 和 $S \subseteq (B \times C)$，则 $R$ 和 $S$ 的*组合*（composition）是：$R \operatorname{;} S = \left\{ a \in A, b \in B, c \in C \mid (a, b) \in R, (b, c) \in S \bullet (a, c) \right\}$。

因此，可以得出性质：$(R \operatorname{;} S) \subseteq (A \times C)$。这个 $R \operatorname{;} S$ 的记号，读作「R then S」或者「R composed with S」。

## 关系的逆（inverse）

对于关系 $R \subseteq (A \times B)$，定义 $R$ 的逆是：$R^{-1} = \left\{a \in A, b \in B \mid (a, b) \in R \bullet (b, a) \right\}$。因此，$R^{-1} \subseteq (B \times A)$。

关系的逆差不多就是反义词的意思。比如，关系「大于」的逆就是「小于等于」，关系「是父节点」的逆就是「是子节点」。

注意这里关系的逆，只是把 a, b 顺序反过来，而不是把关系的意义反过来。（详见 slide 8 的第 27 28 页）
