
slide 9: Classifying relations 关系分类
===================================


一些记号
----


对于 $n$ 元关系 $R$ 的成员的表述是：$(x\_1, x\_2, \\dots, x\_n) \\in R$。


有时，前缀记号（prefix notation）更方便。比如，如果想要说 $x\_1, x\_2, \\dots, x\_n$ 与关系 $R$ 有关，可以写作 $R(x1, x2, \\dots, x\_n)$。


对于二元关系，中缀记号更简单，比如：$xRy$。常见的数字的比较关系运算符（大于、小于、等），就是中缀记号。


邻接矩阵
----


*邻接矩阵*（adjacency matrix）可以用来表示一个有限的二元关系。这里邻接矩阵当中的每个元素都是 bool 类型。当且仅当 $(a, b) \\in (A \\times B)$，$M\_{a, b} \= \\operatorname{true}$。


使用邻接矩阵表示关系，则关系的运算操作可以对应到矩阵：




| 关系操作 | 对应矩阵操作 |
| --- | --- |
| 关系应用 application | 矩阵乘法 |
| 关系组合 composition | 矩阵乘法 |
| 逆关系 inverse | 矩阵转置 |
| 关系求并 union | 矩阵按元与（加法） |
| 关系求交 intersection | 矩阵按元或（乘法） |


注意邻接矩阵的运算当中，都是布尔运算，$1 \+ 1 \= 1$。


比如：


* 求 EZ 的 parent，就是「isParent」矩阵乘以「EZ」矩阵
* 求 EZ 或 H 的 parent，就是「isParent」矩阵乘以「EZ 或 H」矩阵
* 求 H 的 children，就是「isParent」的转置矩阵乘以「H」矩阵
* 「isGrandParent」矩阵，相当于「isParent」乘以「isParent」（关系组合）


自反关系 reflexive relation
-----------------------


若 $A$ 是一个集合，则关系 $I \= \\left\\{ a \\in A \\bullet (a, a) \\right\\}$ 称为 $A$ 的*单位关系（identity relation on $A$）。
\*
对于二元关系 $R$，若满足 $I \\subseteq R$，则 $R$ 叫做*自反关系\*。也就是说，自反关系的每个元素都能对应到自己本身。


若一个二元关系 $R$，满足 $R \\cap I \= \\emptyset$，则此时 $R$ 称作*反自反关系*（irreflexive relation）。也就是说，反自反关系，自己本身永远无法对应到自己。


对称关系 symmetric relation
-----------------------


若二元关系 $R$ 满足 $R^{\-1} \\subseteq R$，则 $R$ 是*对称关系*。这意味着，若 $R$ 当中包含了 $(a, b)$，就一定同时包含着 $(b, a)$。


*反对称关系*（antisymmetric relation）是指，仅在 $a\=b$ 的时候，关系中才会同时含有 $(a, b)$ 和 $(b, a)$。因此，反对称关系可能是自反的，但是自反关系不是反对称。


如果一个关系，既是反对称关系又是反自反关系，则它叫做*非对称关系*（asymmetric）。


非对称关系（Asymmetric）与反对称关系（Antisymmetric）的差异在于：反对称关系容许自反性 $(a, a) \\in R$，而非对称关系不允许。如上述的「小于等于关系」即是反对称关系的一例。


自反关系和对称关系的概括
------------




| 关系 | 数学表示 |
| --- | --- |
| 自反 reflexive | $R(x,x)$ |
| 反自反 irreflexive | $\\neg R(x,x)$ |
| 对称 symmetric | $R(x,y) \\rightarrow R(y,x)$ |
| 反对称 antisymmetric | $(R(x,y) \\wedge R(y,x)) \\rightarrow x\=y$ |
| 非对称 asymmetric | $R(x,y) \\rightarrow \\neg R(y,x)$ |




| 关系 | 自反 | 反自反 | 对称 | 反对称 | 非对称 |
| --- | --- | --- | --- | --- | --- |
| $\<$ | ✗ | ✓ | ✗ | ✓ | ✓ |
| $\>$ | ✗ | ✓ | ✗ | ✓ | ✓ |
| $\=$ | ✓ | ✗ | ✓ | ✓ | ✗ |
| $\\not \=$ | ✗ | ✓ | ✓ | ✗ | ✗ |
| $\\leqslant$ | ✓ | ✗ | ✗ | ✓ | ✗ |
| $\\geqslant$ | ✓ | ✗ | ✗ | ✓ | ✗ |


传递关系 transitive 和等价关系 equivalence
---------------------------------


若关系 $R$ 满足 $((x, y) \\in R) \\wedge ((y, z) \\in R)$ 且还满足 $(x, z) \\in R$，则称 $R$ 是*传递关系*（transitive）。


**自反、传递、反对称**的关系，都称为*偏序*（partial order），**无环**。
另外，若对于所有的 $x, y$，都至少满足 $(x, y) \\in R$ 和 $(y, x) \\in R$ 其中之一，则这是一个*全关系*（total relation），满足*完全性*。注意，完全性是包含了自反性的。


满足**传递、反对称、完全性**的关系是*全序关系*，**是一条链**。由于完全性，全序关系是满足完全性的偏序关系。


[知乎 \- 全序关系和偏序关系的区别是什么？](https://www.zhihu.com/question/36758436/answer/1078452247)


顺带提一句：[Wikipedia](https://zh.wikipedia.org/wiki/%E5%81%8F%E5%BA%8F%E5%85%B3%E7%B3%BB) 上面说，偏序分为*非严格偏序*和*严格偏序*两种。上面的偏序是指非严格偏序，而严格偏序是反自反的。


任何自反、传递、对称的关系，都称为*等价关系*（equivalence）。


集合划分 partition of a set
-----------------------


集合 $X$ 的划分是 $X$ 的非空子集的集合，使得每个 $X$ 的元素 $x$ 都只包含在这些子集的其中一个内。即：collectively exhaustive 且 mutually exclusive。


* 彻底穷举 collectively exhaustive：$X\_1 \\cup X\_2 \\cup \\dots X\_n \= X$
* 相互排斥 mutually exclusive：$S\_i \\cap S\_j \= \\emptyset$


在数学中，假设在一个集合 $X$ 上定义一个等价关系（用 $\\sim$ 来表示），则 $X$ 中的某个元素 $a$ 的*等价类*（equivalence class）就是在 $X$ 中等价于 $a$ 的所有元素所形成的子集：$\[a]\=\\{x \\in X \\mid x \\sim a\\}$。


等价类的概念有助于从已经构造了的集合构造新集合。在 $X$ 中的给定等价关系 $\\sim$ 的所有等价类的集合表示为 $X / \\sim$ 并叫做 $X$ 除以 $\\sim$ 的*商集*（quotient set）。


因为等价关系的 $a$ 在 $\[a]$ 中和任何两个等价类要么相等要么不相交的性质。**得出 $X$ 的所有等价类的集合形成 $X$ 的划分**：所有 $X$ 的元素属于一且唯一的等价类。反过来， **$X$ 的所有划分也定义了在 $X$ 上等价关系**。


举例说明：如果 $X$ 是轿车的集合，而 $\\sim$ 是「颜色相同」的等价类，则一个特定等价类由所有绿色轿车组成。$X / \\sim$ 自然的被认同于所有轿车颜色的集合。


再举个例子：用模运算在自然数集合下，生成了三个等价类


* $S\_{0}\=\\{n \\in \\mathbb{N} \\mid n \\bmod 3\=0 \\bullet n\\}\=\\{0,3,6,9,12,15,18, \\ldots\\}$
* $S\_{1}\=\\{n \\in \\mathbb{N} \\mid n \\bmod 3\=1 \\bullet n\\}\=\\{1,4,7,10,13,16,19 \\ldots\\}$
* $S\_{2}\=\\{n \\in \\mathbb{N} \\mid n \\bmod 3\=2 \\bullet n\\}\=\\{2,5,8,11,14,17,20 \\ldots\\}$


因此， $\\left\\{S\_{0}, S\_{1}, S\_{2}\\right\\}$ 构成了 $\\mathbb{N}$ 的集合划分。


