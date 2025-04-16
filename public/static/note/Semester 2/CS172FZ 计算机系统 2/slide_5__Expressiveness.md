
slide 5: Expressiveness
=======================


谢非尔竖线
-----


谢非尔竖线「$\\mid$」用于表示 NAND，即 $p \\mid q \\leftrightarrow \\neg(p \\wedge q)$


NAND 可以表示常见的五种符号：




| 运算名 | 原来的 | NAND |
| --- | --- | --- |
| NOT | $\\neg p$ | $p \\mid p$ |
| OR | $p \\vee q$ | $(p \\mid p) \\mid (q \\mid q)$ |
| AND | $p \\wedge q$ | $(p \\mid q) \\mid (p \\mid q)$ |
| IMPLIES | $p \\rightarrow q$ | $p \\mid (q \\mid q)$ |
| EQUIVALENCE | $p \\leftrightarrow q$ | $(p \\mid q) \\mid ((p \\mid p) \\mid (q \\mid q))$ |


规范形式 Canonical Normal Forms
---------------------------


* 文字（literal），即 $x$ 和 $\\neg x$
* 逻辑*析取*（disjunctive），即**或**
* 逻辑*合取*（conjunctive），即**与**
* 析取范式 DNF，Disjunctive Normal Form，即一堆文字的**与的或**，SOP
* 合取范式 CNF，Conjunctive Normal Form，即一堆文字的**或的与**，POS


