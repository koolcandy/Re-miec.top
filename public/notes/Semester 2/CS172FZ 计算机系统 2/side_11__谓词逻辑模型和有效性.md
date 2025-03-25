# side 11: 谓词逻辑模型和有效性

## 公式的分类

*   *恒真*（tautology）：对于每一个模型 $M$，都有 $M \models \varphi$。这时候，一般会简写为 $\models \varphi$。
*   *不满足*（unsatisfiable） 或 *矛盾*（a contradiction）：是指没有任何一个模型 $M$ 满足 $M \models \varphi$。这种情况下通常简写为 $\not \models \varphi$。
*   *可满足*（satisfiable）：是指，至少有一个模型 $M$ 满足 $M \models \varphi$。

## 模型（model）

在命题逻辑（propositional logic）当中，*模型*是指真值表当中的某一行。也称作*估值*（valuation）。

在三段式（syllogistic logic）当中，模型是指填写了信息的韦恩图。

## 建立模型的步骤

1.  定义一个非空集合 $D$，称为*域*（domain）
2.  写清楚*解释*（interpretation），说明每个常量、符号、等是什么含义
3.  检查公式 $\varphi$ 在这个域和解释下，是否为 true

因此，一个模型可以写作 $\langle D, I \rangle$（domain、interpretation）：

*   $\langle D, I\rangle \models \phi$ 表示公式 $\phi$ 在模型 $\langle D, I\rangle$ 当中为 `true`
*   $\langle D, I\rangle \not \models \phi$ 表示公式 $\phi$ 在模型 $\langle D, I\rangle$ 当中为 `false`
