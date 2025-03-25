# slide 3：命题逻辑

## 蕴含真值表

| $p$ | $q$ | $p \rightarrow q$ |
|---|---|---|
| 1 | 1 | 1 |
| 1 | 0 | 0 |
| 0 | 1 | 1 |
| 0 | 0 | 1 |

若 $p$ 非真，则 $p \rightarrow q$ 总是真的。<br/>
[知乎：如何理解数学里的「若 A 不真，则 A→B 总是真的」这种蕴含关系？](https://www.zhihu.com/answer/829653720)

## 逻辑形式与数学形式

| logic | arithmetic |
|---|---|
| $\neg p$ | $1 - p$ |
| $p \wedge q$ | $\min(p,q)$ |
| $p \vee q$ | $\max(p,q)$ |
| $p \rightarrow q$ | $p \leq q$ |
| $p \leftrightarrow q$ | $p = q$ |

## 估值

在命题逻辑中，估值对应于真值表中的一行。

$V \models \phi$ 意思是命题 $\phi$ 在估值 $V$ 下为真<br/>
$V \not \models \phi$ 指命题 $\phi$ 在估值 $V$ 下为假
