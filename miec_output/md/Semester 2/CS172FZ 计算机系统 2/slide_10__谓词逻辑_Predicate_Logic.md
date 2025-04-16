# slide 10: 谓词逻辑 Predicate Logic

## 谓词逻辑的形式语言 The Formal Language of Predicate Logic

* 常量符号：$a, b, c, dots$
* 变量符号：$x, y, z, dots$
* 谓词符号：$A, B, C, \dots, P, Q, R, \dots$
* 五个*命题*运算符（propositional operator）：$\wedge, \vee, \neg, \rightarrow, \leftrightarrow$
* 两个*量词*（quantifier）：$\forall, \exists$

## 三段式陈述的表示

| 类型 | 语言陈述 | 谓词逻辑形式 |
|:---:|:---|:---|
| A | All A are B | $(\forall x \cdot Ax \rightarrow Bx)$ |
| I | Some A are B | $(\exists x \cdot Ax \wedge Bx)$ |
| E | All A are not B | $(\forall x \cdot A x \rightarrow \neg B x)$ |
| E | No A is B | $\neg(\exists x \cdot A x \wedge B x)$ |
| O | Some A are not B | $(\exists x \cdot A x \wedge \neg B x)$ |
| O | Not all A are B | $\neg(\forall x \cdot A x \rightarrow B x)$ |

通过观察不难发现，所有的 $\forall$ 都对应着 $\rightarrow$，而所有的 $\exists$ 都对应 $\wedge$。

## 谓词逻辑式子（WFF，合式公式）的构成

1. 项（term）是指变量（$x, y, z$）或常量（$a, b, c$）。
2. 式（formula）按照如下规则构成：
3. 若 $t_1, t_2, \dots, t_n$ 是项，而 $P$ 是一个谓词符号，则 $P_{t_1, t_2, \dots, t_n}$ 是一个式；
4. 若 $\phi$ 和 $\psi$ 是式，那么以下五个东西也是式：$\neg \phi$，$\phi \wedge \psi$，$\phi \vee \psi$，$\phi \rightarrow \psi$，$\phi \leftrightarrow \psi$；
5. 若 $\phi$ 是式而 $x$ 是一个变量，则 $(\forall x \cdot \phi)$，$(\exists x \cdot \phi)$ 也是式。

## 变量辖域（scope）

大概是类似编程语言当中，变量作用域的概念。

* 在辖域内的变量，是 *bound* 的，约束出现
* 在辖域外的变量，是 *free* 的，自由出现

## 驴句

详见 slide 10 最后一页。
