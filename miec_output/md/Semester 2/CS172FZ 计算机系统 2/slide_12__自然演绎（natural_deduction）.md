# slide 12: 自然演绎（natural deduction）

**自然演绎是一种证明方法，具体到底是有什么规律，最好还是看 slide 里面几个证明过程的例子**

## 典型的证明

典型的证明（typical proof）是指，对方给你一些假设的谓语以及想要得出的结论，你需要写出一些步骤，把谓语给转化成结论。

## 自然演绎证明的大致结构

Gentzen 认为，所有的五个运算符以及两个量词修饰符，都具有介入规则和除去规则（introduction rule and an elimination rule）：

*   若谓语当中出现了，应该使用除去规则
*   若结论当中出现了，应当使用介入规则

自然演绎不包含公理。**除去和引入，是自然演绎的核心。**

## 新的记号

之前，用 $\varphi_1, \varphi_2, \dots, \varphi_n \models \psi$ 表示，在 $\varphi_1, \varphi_2, \dots, \varphi_n$ 全真的模型当中，$\psi$ 也是真的。

现在，类似的，用 $\varphi_1, \varphi_2, \dots, \varphi_n \vdash \psi$ 表示，可以从 $\varphi_1, \varphi_2, \dots, \varphi_n$ 这一堆谓语开始，构造一个自然演绎证明，然后得到结论 $\psi$。

$\bot$ 表示矛盾。

$[X] \cdots Y$ 表示，如果假定了 $X$，那么就能推出 $Y$。

[知乎上一个好图](https://www.zhihu.com/question/321669880)
