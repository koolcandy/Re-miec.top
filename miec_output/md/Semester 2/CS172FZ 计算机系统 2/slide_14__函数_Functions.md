# slide 14: 函数 Functions

## 基本定义

函数是一种特殊的关系。若二元关系 $R$ 满足当 $(a, b) \in R$ 且 $(a, c) \in R$，必定有 $b=c$，则这个二元关系 $R$ 是一个函数。

更广泛的来讲，当多元关系 $R$ 满足 $(a_1, a_2, \dots, a_n, b) \in R$ 且 $(a_1, a_2, \dots, a_n, c) \in R$，必定有 $b=c$，则这个二元关系 $R$ 是一个函数。

由于函数是比较特殊的关系，通常把 $(a, b) \in f$ 写作 $f(a) = b$，即多元组前边是自变量，最后是因变量。

因此，关系是一种特殊的集合，而函数又是一种特殊的关系。所以
- 所有的关系运算（求逆、组合等），都可以用函数解决。
- 所有的与集合论有关的运算（并集交集等），也都可以用函数解决

## lambda 记号

lambda 记号是用来更简洁的定义函数的一种工具。例如 $T \triangleq(\lambda a \in \mathbb{Z} \cdot a+1)$，表示的是，$T$ 是一个函数，参数是一个整数 $a$，返回值是 $a+1$。即：$\lambda$ 后面写的是参数（自变量），圆点 $\cdot$ 后面写的是返回值（因变量）。

## 函数的定义域，值域，像，到达域（domain，range，image，codomain）

*   定义域：略
*   值域：略
*   像：是值域的一个子集，这个子集包含由函数 $f$ 映射来的一些元素。注意像并不是函数的值。函数的值是值域当中的某个元素，而函数的像是至于当中的某个子集。
*   到达域，又称对应域，与值域不同。值域是到达域的一个子集。满射函数的值域与到达域是相等的。

## 函数的单射，满射，双射（injective，surjective，bijective）

*   单射，是指，像中的每一个元素，都是由定义域中唯一的一个元素映射来的：$(\forall x, y \cdot(x \in X \wedge y \in X \wedge f(x)=f(y)) \rightarrow(x=y))$
*   满射，是指，像中的每一个元素，都能被定义域中的元素映射得到：$(\forall z \cdot z \in Y \rightarrow(\exists x \cdot x \in X \wedge f(x)=z))$
*   双射，是指，既是单射，又是满射。即双射的两个集合，元素个数一定相等。

## 偏函数（partial function）

大概就是，定义域当中有的元素没有映射出去。

如果进一步限制约束偏函数的定义域，那么就会变成 total function（翻译过来可能是全函数）

比如，阶乘函数 `fact(x)` 的定义域如果是整数集，那么它就是一个偏函数，因为 `fact(-1)` 不知道。

## 多重集 multiset（bag）

顾名思义，是指元素可以出现多次的集合。其中，元素出现的次数叫做重数，multiplicity。

与 C++ 当中的 `std::multiset` 不同的是，数学概念上的多重集，是无序的。

一般来讲，可以用一种特殊的双方括号，$[[ \dots ]]$，来表示多重集，虽然这种表示方法并不是正规的。

也可以把多重集理解为一个函数。

多重集的并比较特殊，有两种。第一种，符号与常规集合是一致的，运算示例：
$$ \begin{aligned}
&[[ a, a, b, b, b, c ]] \cup [[ a, b, b, c, c ]] \\
&={(a, 2),(b, 3),(c, 1)} \cup{(a, 1),(b, 2),(c, 2)} \\
&={(a, 2),(b, 3),(c, 1),(a, 1),(b, 2),(c, 2)}
\end{aligned} $$
第二种，符号里面多了个加号，运算示例：
$$[[ a, a, b, b, b, c ]] \uplus [[ a, b, b, c, c ]]=[[ a, a, a, b, b, b, b, b, c, c, c ]]$$
其中，$\uplus$ 的定义是：$A \uplus B=(\lambda x \cdot A(x)+B(x))$。而 $A(x)$ 指 bag $A$ 当中的元素 $x$ 的重数。

## 序列 sequence

序列，保存了每个元素出现的位置（position）。类似于 `std::map<T, std::vector<int>> pos;`。

一般来讲，可以用特殊的尖括号 $\langle \dots \rangle$ 来表示序列，虽然这种表示方法也不是特别正规的。

例如，$\langle a, b, c, b, a, a\rangle$ 是一个序列，其中 $a$ 出现在 $1, 5, 6$ 三个位置，$b$ 出现在 $2, 4$ 两个位置，$c$ 仅出现在 $3$ 一次。

类似于多重集，序列也可以理解成一个函数。对于序列 $A$，$A(i)$ 表示序列 $A$ 的第 $i$ 个位置上的元素。

$\langle a, b, c, b, a\rangle$ 可以写成集合的形式：$\{(1, a),(2, b),(3, c),(4, b),(5, a)\}$。因此，序列的并运算，示例如下：
$$\begin{aligned}
&\langle a, a, b\rangle \cup\langle a, b\rangle \\
&\quad=\{(1, a),(2, a),(3, b)} \cup{(1, a),(2, b)\} \\
&\quad=\{(1, a),(2, a),(2, b),(3, b)\}
\end{aligned}$$

序列还有一个特殊的运算：$\operatorname{cardinality}$，作用是返回一个有限集合的元素个数。若 $S$ 是一个有限集合，$\# S$ 就是对应的 $\operatorname{cardinality}$。如：$\#\langle a, b, c, b, a\rangle=5$。

不仅如此，序列还可以按照顺序连接起来，这个运算名叫 $\operatorname{concatenation}$。例如，$\langle a, b, c\rangle \frown\langle b, a\rangle \frown\langle b, a\rangle=\langle a, b, c, b, a, b, a\rangle$。由于这个弧线写起来有点麻烦，有时候直接用点 $\cdot$ 来表示连接，即 $a \cdot b \cdot c$。

## 关于集合的用处的一些补充

*   在这门课当中，集合是用来辅助学习逻辑的。
*   数据库理论中，关系是基本的概念（Codd’s relational algebra）
*   计算理论当中，函数是基本的概念（Church’s λ-calculus）
*   语言理论当中，序列是基本的概念（Kleene’s regular expressions，Chomsky’s grammars 等）
