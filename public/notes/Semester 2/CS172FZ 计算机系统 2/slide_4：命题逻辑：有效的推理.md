# slide 4：命题逻辑：有效的推理

## 著名的有效推理

## 肯定前件 Modus ponens

$(P \rightarrow Q), P \models Q$
如果 $P$，则 $Q$；且 $P$ 为真，故 $Q$ 为真。

## 否定后件 Modus tollens

$(P \rightarrow Q), \neg Q \vDash \neg P$
如果 $P$，则 $Q$。非 $Q$。所以，非 $P$。

## 常见的逻辑运算定律

| 运算律     | 示例 1                      | 示例 2                      |
| :---------- | :--------------------------: | :--------------------------: |
| 交换律     | $p \wedge q = q \wedge p$    | $p \vee q = q \vee p$       |
| 结合律     | $(p \wedge q) \wedge r = p \wedge (q \wedge r)$ | $(p \vee q) \vee r = p \vee(q \vee r)$ |
| **分配律**  | $p \wedge(q \vee r) = (p \wedge q) \vee(p \wedge r)$ | $p \vee(q \wedge r) = (p \vee q) \wedge(p \vee r)$ |
| 德摩根     | $\neg(p \wedge q) = (\neg p) \vee(\neg q)$ | $\neg(p \vee q) = (\neg p) \wedge(\neg q)$ |
| **吸收律**  | $p \vee(p \wedge q) = p$    | $p \wedge(p \vee q) = p$    |
| 条件句     | $(p \rightarrow q) = (\neg p \vee q)$ | $\neg(p \rightarrow q) = (p \wedge \neg q)$ |

## 逻辑等价

当 $\phi \models \psi$ 且 $\psi \models \phi$，则 $\phi$ 与 $\psi$ 等价。

当 $\phi$ 与 $\psi$ 等价，则它们俩的真值表的每一行都一模一样。即对于任何估值函数 $V$，有 $V(\phi)=V(\psi)$。
