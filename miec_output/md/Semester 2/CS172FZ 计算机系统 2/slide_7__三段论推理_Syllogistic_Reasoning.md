# slide 7: 三段论推理 Syllogistic Reasoning

三段论，是具有如下特征的推理：

* 只有两个前提（premise）
* 前提和结论，只能是以下形式之一（其中 A 和 B 是谓语，代表集合）：
    * 所有 A 都 B（$A \subseteq B$）
    * 所有 A 都非 B（没有 A 是 B）（$A \cap B = \emptyset$）
    * 有的 A 是 B（$A \cap B \not= \emptyset$）
    * 有的 A 非 B（不是所有 A 都 B）（$A \not\subseteq B$）
* 含有三个谓语

## 命题（AEIO）

* A 命题：All A are B，普遍肯定
* E 命题：All A are not B，普遍否定
* I 命题：Some A are B，部分肯定
* O 命题：Some A are not B，部分否定

给出四个命题之一，则可以得出剩下几个的结果

| 给定      | 推 A    | 推 E      | 推 I    | 推 O    |
| ----------- | ------- | ------- | ------- | ------- |
| $A$        | - 7     | $\neg E$ | $I$     | $\neg O$ |
| $\neg A$   | -       | ?       | ?       | $O$     |
| $E$        | $\neg A$ | -       | $\neg I$ | $O$     |
| $\neg E$   | ?       | -       | $I$     | ?       |
| $I$        | ?       | $\neg E$ | -       | ?       |
| $\neg I$   | $\neg A$ | $E$     | -       | $O$     |
| $O$        | $\neg A$ | ?       | ?       | -       |
| $\neg O$   | $A$     | $\neg E$ | $I$     | -       |

以上四种可以使用韦恩图表示。详见 slide 7 的第 16 页。
