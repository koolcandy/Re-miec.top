
Lecture 11\. P、NP、NP 完全
=======================


对于 HALT 问题，可以证明，无论花多少时间都不能解决。也就是说他不可判定。


CS355 当中证明过，$HALT\_\\text{TM} \= \\{\\langle M, w \\rangle \\mid \\text{图灵机 } M \\text{ 在输入 } w \\text{ 上会停机} \\}$ 不可判定。



> 如果果一个图灵机对于任何输入，都永不无限运行，则这个图灵机称为判定器。如果一个语言能被某个判定器判定，则称这个语言是可判定的。
> 
> 
> 假设 $HALT\_\\text{TM}$ 可判定，就能证明 $A\_\\text{TM}$ 可判定（设 $R$ 是 $HALT\_\\text{TM}$ 的判定器，构造图灵机 $S$ 判定 $A\_\\text{TM}$）：
> 
> 
> $S \=$ “在输入 $\\langle M, w \\rangle$ 上，
> 
> 
> 1. 先跑一遍判定器 $R$ 看看 $M$ 是否对于输入 $w$ 停机。如果不能停机，直接拒绝。
> 2. 由于现在确保 $M$ 可以停机，于是就直接模拟运行 $M$，直到停机为止。若 $M$ 接受则 $S$ 接受，$M$ 拒绝则 $S$ 拒绝”
> 
> 
> 但是这与事实不符，因为 $A\_\\text{TM}$ 明明是不可判定的，这里证明出它可判定，产生了矛盾，所以最初的假设不成立。于是 $HALT\_\\text{TM}$ 不可判定。


对于一些问题，可以证明，不可能在有限时间内产生正确输出。但是可以在有限时间内产生近似的或者不正确的输出。


* P 问题，就是可以在 $O(n^k)$ 时间内解决的问题（算出任意解的感觉）
* NP 问题，就是可以在 $O(n^k)$ 时间内验证的问题（验证特解的感觉）



> * NP：成员资格可以多项式时间内验证（verify）的语言类。比如对于哈密顿路径的存在性问题，我只要随便给出一条哈密顿路就可以；对于是不是合数的问题，我只要随便给出一个因子就可以。
> * P：成员资格可以多项式时间内判定（determine）的语言类。要求更高一点。


一般认为，P 的问题，都是 easy 的；不是 P 的问题，都是 hard 的，比如指数时间问题。但是 P 与 NP 是否相等，人类暂时无法证明。


NP 完全
-----


有一个特殊的类，叫做 NP 完全。对于 NP 完全问题，人类还没能发明出 P 的算法，也无法证明说这些问题不存在 P 的算法。


NP 完全（注意不是 NP 难），CS355 课上老师说，很难，像是一个标杆。形式化的定义是：**若语言 $B \\in NP$ 且 $\\forall A \\in NP, A \\leq\_p B$ 则称 $B$ 是 NP 完全的**。所以假如任何一个 NP 完全问题具有了 P 的算法，那么所有的 NP 问题就都是 P 的了。所以只要给 NP 完全的问题找出一个 P 的做法，那么就相当于证明了 P\=NP。



> 要证明某个问题是 NP 完全的，可以先证明这个问题是 NP 的，再找一个已知的 NP 完全问题，证明两个问题之间多项式时间可归约。


有一些 NP 完全问题看起来是 P 的，或者说跟某些 P 的问题很相似，但他就是找不出 P 的做法。比如最短路很好求，最长路不好求。课件上给了一个例子，关于 SPATH 问题和 LPATH 问题的差异性，CS355 Lab6 有做过。


$SPATH \= \\{\\langle G, a, b, k\\rangle \\mid G \\text{ contains a simple path of length at most } k \\text{ from } a \\text{ to } b\\}$，它是 P 的，YYF 当时写的证明是：



> Build a DTM $M$ decides $SPATH$.
> 
> 
> $M \=$ "On input $\\langle G, a, b, k \\rangle$:
> 
> 
> 1. Mark the node $a$ as $0$
> 2. For $i$ from $0$ to $m$ where $m$ is the total number of edges in $G$, repeat the follow step 3:
> 3. Scan all of the edges. If there is a edge $(u, v)$ that $u$ is marked $i$ and $v$ is unmarked, then mark $v$ as $i\+1$
> 4. If $b$ is marked and the mark is less than or equal to $k$, then accept. Otherwise, reject."
> 
> 
> Assume the total number of nodes in $G$ is $n$. Step 1, 4 cost constant times while step3 repeats for $O(n^2\)$ times and in each single execution it cost $O(n^2\)$ times. Therefore, $M$ runs in polynomial time. So $SPATH \\in P$.


$LPATH \= \\{\\langle G, a, b, k \\rangle \\mid G \\text{ contains a simple path of length at least } k \\text{ from } a \\text{ to } b\\}$ 是 NP 完全的，YYF 当时的证明过程是：



> Firstly, it's easy to show that $LPATH$ is NP, because we can just nondeterministically guess a path of length at least $k$ in $G$ and check whether this path connects $a$ and $b$ in polynomial time. So $LPATH \\in NP$.
> 
> 
> Secondly, let's show that $UHAMPATH \\leq\_p LPATH$.
> 
> 
> Lemma: Let $\|V\|$ is the number of nodes in $G$. $\\langle G, a, b \\rangle \\in UHAMPATH$ iff $\\langle G, a, b, \|V\|\-1 \\rangle \\in LPATH$.
> 
> 
> * Proof for $\\rightarrow$ direction: If undirected graph $G$ has a Hamilton path from $a$ to $b$, then the length of this path must be $\|V\| \- 1$ and this path must be a simple path according to the definition.
> * Proof for $\\leftarrow$ direction: If undirected graph $G$ with $\|V\|$ nodes has a simple path of length $\|V\|\-1$, then this path must be a Hamilton path according to the definition.
> 
> 
> TM $R$ decides $UHAMPATH$ in polynomial time by reducing to $LPATH$:
> 
> 
> $R \=$ "On input $\\langle G, a, b \\rangle$,
> 
> 
> 1. if the totol number of nodes $\|V\| \\leq 1$, reject.
> 2. Check if $\\langle G, a, b, \|V\| \- 1 \\rangle \\in LPATH$. If yes, accept. Otherwise, reject."
> 
> 
> Because we can calculate $\|V\|$ in polynomial time, so this reduction takes polynomial time. Therefore, $UHAMPATH \\leq\_p LPATH$.
> 
> 
> Because $LPATH \\in NP$ and $UHAMPATH \\leq\_p LPATH$ and $UHAMPATH$ is NP\-complete, So $LPATH$ is NP\-complete.


研究计算理论的意义
---------


有些问题看起来可解，但是实际上是 NP 完全的，要熟悉 NP 完全的问题有哪些，如果实际工程当中遇到了，就去设计近似算法，或者针对特殊情况进行处理，不要纠结精确解。


* 旅行商问题
* SAT 问题（库克\-列文定理）
* 3\-SAT 问题
* CLIQUE 问题
* VERTEX\-COVER 问题（顶点覆盖问题）
* HAMPATH 问题（哈密顿路径问题）
* UHAMPATH 问题（无向图的哈密顿路径问题）
* SUBSET\-SUM 问题（子集和问题）


