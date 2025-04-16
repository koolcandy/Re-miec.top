
Lecture 5\. Combinational Testing
=================================


The inputs to the software is called the *Causes*；


The associated output is called the *Effects*。


常见工具
----


* 真值表 truth table
* 因果图 cause\-effect graph
* 判定表 decision table
* 正交实验设计 orthogonal experimental design


真值表
---


The inputs to the software is called the *Causes*；The associated output is called the *Effects*。


* $2^n$ 种组合
* 一个条件就要么真要么假，两个就需要考虑组合
* 如果遇到逻辑上不可能成立的组合，就可以删掉
* don't care 条件，类似于卡诺图啥的，在这里依然存在。可以用于减少组合的数量。
* 关于判断 $l \\leq x \\leq r$ 的条件，需要拆点，大概是拆成 $x \< l$ 和 $x \\leq r$ 两个，有点 2\-sat 的感觉，具体怎么拆，参考下图课件
* 对于不合法的输入，可以不用往真值表里面塞，起到精简的作用。


![image-20221016125922401](https://s2.loli.net/2022/11/10/nO7BQZCjeA6SEo2.png)


因果图
---


用于分析组合条件的关系。是有向图。看懂就行，不做要求。


判定表
---


* 条件桩 condition stub
* 动作桩 action stub
* 条件项 condition item
* 动作项 action item


桩大概是行的意思，项大概是格的意思


假设有 $n$ 个条件桩，那么最多有 $2^n$ 列。同样可以用 don't care 来精简。


正交实验设计
------


感觉像是一种奇技淫巧（黑科技），比如对于三个布尔条件，可以均衡的把真值表 8 个缩成 4 个测试。


正交表已经有现成的了，可以直接查 https://www.york.ac.uk/depts/maths/tables/orthogonal.htm：


* [L4](https://www.york.ac.uk/depts/maths/tables/l4.gif): Three two\-level factors
* [L8](https://www.york.ac.uk/depts/maths/tables/l8.gif): Seven two\-level factors
* [L9](https://www.york.ac.uk/depts/maths/tables/l9.gif) : Four three\-level factors
* [L12](https://www.york.ac.uk/depts/maths/tables/l12.gif): Eleven two\-level factors
* [L16](https://www.york.ac.uk/depts/maths/tables/l16.htm): Fifteen two\-level factors
* [L16b](https://www.york.ac.uk/depts/maths/tables/l16b.htm): Five four\-level factors


L 后面的数字代表这个表有几行。可见，七个布尔变量，如果用真值表需要 128 个测试点，这里仅需 8 行（个测试点）


