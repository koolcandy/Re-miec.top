
Lecture 5 系统建模
==============


模型是从某个特定视角对系统的一个抽象，也就是提取最显著特征之后的简化，并不是系统的另一种等价表示。比如，这个笔记就是对这门课的一个抽象。建模可以比较清楚的看到系统的功能、优缺点，还有助于更好的讨论设计方案、文档等。


一般比较常见的视角有：


* 外部视角（external），关注上下文或环境，比如系统是否要使用第三方 API
* 交互视角（interaction），关注系统与环境或用户，以及构件之间的交互（方式）
* 结构化视角（structural），关注系统组织结构或系统所处理的数据的结构，
* 行为视角（behavior），关注系统的动态行为、系统如何响应事件，比如异常怎么处理


UML（Unified Modelling Language，统一建模语言）面向对象建模的标准语言。UML 当中有多种图的模型，但是只需要其中 5 个就可以描述系统的基本特性：


* 活动图（activity diagram）
* 用况图（use case diagram）
* 顺序图（sequence diagram）
* 类图（class diagram）
* 状态图（state diagram）


系统建模：外部视角 external perspective
------------------------------


### 上下文模型 context model


在系统开发的初期（编写规格说明书）的时候，就要确定系统的边界，也就是确定系统应该包含什么、不应该包含什么。然后，用简单的 block 图，或者空的类图，粗略表述一下系统与环境之间的关联（因为 UML 当中没有专门针对上下文模型的图）。


#### 用 UML 画上下文模型


用一个矩形方块表示一个系统（可以是本身也可以是外部的），然后用一条实线把内部外部系统连接起来


![](https://s2.loli.net/2023/04/12/MPakVOhXnUDN1eJ.png)


如图，表示了一个精神病住院治疗系统（Mentcare）及其环境中其他系统的上下文模型。


![](https://s2.loli.net/2023/04/21/tcGTZDiaYWML3bX.png)


##### 术语：构造型 stereotype


构造型是三种 UML 扩展方式之一。


在图表中，构造型跟元素紧挨着，用 `<<xxx>>` 的形式表述，用于描述这个元素是什么类型的，如：`<<system>>`，`<<use>>`，`<<include>>`，`<<import>>` 等。


上述示例图当中每一个方块表示的都是一个系统，所以都是 `<<system>>`。


### 业务流程模型 business process model


刚才用 UML 画出来的上下文模型，只是体现了系统之间有关系，但是没有具体体现，到底是什么关系，比如，系统 A 给系统 B 提供什么数据？用网络还是什么方式提供？


业务流程模型，顾名思义，对业务流程进行建模。也就是描述，这个系统怎样参与到业务当中去。


在 UML 当中可以使用 **活动图** 表示业务流程模型，因为活动图可以描述一个过程。业务流程模型也可以用 *业务流程模型和标记法（Business Process Model and Notation，BPMN）* 表示。


#### 活动图 activity diagrams


活动图显示了过程中的一个活动，以及从一个活动到另一个活动的控制流（flow），用 activity nodes 与 activity edges 描述（就跟状态机似的）。


##### 图例


* 圆角矩形：表示一个「活动」，也就是必须执行的子过程
* 直角矩形：表示一个元素或对象
* 菱形：表示一个「决策」，类似于 `if` 语句，条件在旁边用 `[xxx]` `[yyy]` 表示
* 黑色实心圆：表示初始节点，也就是工作流的开始
* 黑色实心圆外边套个圈圈：表示结束节点
* 很粗的实线（或又长又窄的条条）：也是一种控制节点，表示并行活动的开始（分离，split or fork）或结束（汇合，join）
* 箭头：从开始走到结束，表示执行的顺序


![](https://s2.loli.net/2023/04/12/z1jY5PdDv68sQeb.png)


##### 示例：活动图描述 Mentcare 系统如何对精神病患者强制拘留住院


![](https://s2.loli.net/2023/04/21/APTIqW132Npe5nt.png)


系统建模：交互视角 interaction perspective
---------------------------------


系统当中可以有多种类型的交互，比如用户交互（输入输出），比如这个系统与环境中其它系统的交互，再比如系统内部不同构件之间的交互…


### 用况（use case）


用况是一个任务，可以与系统外部的交互。外部的主体通常是人类，也可以是其它系统。


用况图相当于用况的一个简单概览。而如果想要详细的描述，可以用表格的方式：




| 用况 | 用户故事管理系统：更新用户故事 |
| --- | --- |
| **参与角色 actors** | 产品负责人 |
| **描述 descriptions** | 负责人登陆进去管理系统，对用户故事进行修改，然后检查是否合法，检查完毕后保存。更新好之后，可以选择是否刷新界面显示 |
| **数据 data** | 系统当中存储的一个用户故事 |
| **触发激励 stimulus** | 负责人的命令 |
| **响应 response** | 确认用户故事已经被更新、通过合法性检查并保存 |
| **注解 comments** | 必须是负责人才有这个权限 |


#### 用况图


##### 关系


用况图是用户与系统交互的最简表示形式，展现了用户和与他相关的用况之间的关系。


用况与用况之间，可以有包含（include）和扩展（extend）关系。


$A \\xrightarrow{\\text{\<\>}} B$，表示完成用况 $A$，就必须完成用况 $B$。比如，$A$ 是取钱，$B$ 是输密码。换句话说，$B$ 是 $A$ 的子过程。


$A \\xleftarrow{\\text{\<\>}} C$，表示完成用况 $A$ 之后，可以选择继续完成用况 $C$。比如 $A$ 是取钱，$C$ 是打印凭条。而即使没有完成 $C$，也依然可以完成 $A$。也就是说，相对于 $C$，$A$ 是独立的。


于是刚才那个表格可以这样表示出来


![](https://s2.loli.net/2023/04/21/9nclK57MbIRyN2X.png)


还有一种关系叫做泛化（generalization）。$A \\rightarrow B$ 大概含义就是 $A \\in B$。比如，经理也是一种员工。利用泛化，可以对用况图进行简化：


![](https://s2.loli.net/2023/04/21/ePfZyDVGAl48Itw.png)


##### 图例


![](https://s2.loli.net/2023/04/12/nSaXGbwhed2f78D.png)


* 小人表示一个角色。注意这个角色可以是人，也可以是物体（比如其它系统）
* 实线方框表示一个系统的边界
* 椭圆表示用况
* 横线与 `<<xxx>>` 合在一起表示一种关系


### 顺序图


顺序图可以直观的看出来 actor 与系统以及系统各个构件之间的，按照时间排序的交互。


#### 图例


![](https://s2.loli.net/2023/04/12/yUSp3xZlaHnszWA.png)


* 标着 sd 的框，由于 sd 是 sequence diagram 的缩写，顾名思义，是框起来整个图
* 标着 alt 的框，alternate，表示分支。条件用 `[xxx]` 表示。课件画的不对，中间应该是用虚线分隔，而不是实线。
* $\\boxed{\\text{:类名}}$ 与 $\\boxed{\\text{对象名:类名}}$ 很好理解
* $\\times$ 表示销毁：在 `new`\-`delete` 的顺序图描述当中可以看到
* line\-arrowhead 表示异步消息：sender 发出消息后，继续干自己的事情
* solid\-arrowhead 表示同步消息：sender 会等待 receiver 的回应，类似函数调用
* 反向的 dashed\-arrowhead 表示返回的消息：（貌似也是异步的）
* 一个圆加上箭头表示 found message：未知 sender 或 sender 未画出
* 一个箭头加上一个圆圈表示 lost message：没有发送到 receiver 或 receiver 未画出


不好描述。但是看几个顺序图例子就应该能懂的差不多了。


![](https://s2.loli.net/2023/04/22/ryTGE3PhM9eqLJj.png)


上图橙色圆圈的递归调用，可以理解为重新回到整个蓝色长条的起点


![](https://s2.loli.net/2023/04/22/a3wmBLgHAuIfl4Y.png)


![](https://s2.loli.net/2023/04/22/NrMfXYlUREIJua1.png)


系统建模：结构视角 structural perspective
--------------------------------


结构模型，既可以是用来描述系统设计结构的静态结构的模型，也可以是用来描述系统运行时的组织的动态的模型（因为有交互所以动态）。讨论和设计系统结构的时候，系统模型就很有用。


### 类图 Class diagram


类图可以用来描述系统静态结构的模型。


这个比前面简单些了。


![](https://s2.loli.net/2023/05/09/I7dTP2LgrUmlNjy.png)


#### 泛化 Generalization


实线连接，空心三角箭头


#### 实现 Realization


就是「类」实现「接口」。接口在类图当中用 `<<interface>>` 注明。使用虚线链接的空心三角箭头。


#### Composition \& Aggregation \& Association


**聚集在中间**。


![](https://s2.loli.net/2023/04/12/9CoIQFfYDm8upJx.png)


从左到右，越来越宽泛。


Association 是最宽泛的，只是表示两个东西有联系。也有的地方把 Association 叫做「相识 acquaintance」。


*聚集（aggregation）*，可以理解为「part of」。


composition 表示「whole/part」的关系。如果其中一个移除掉了，那么对应的另一个也要移除掉。


课件写的太烂了，不是很好理解，所以我咨询了 Chat GPT。以下是它给出的回答：



> Q: 如何理解 uml 类图当中的：association、aggregation、composition？
> 
> 
> A: 在 UML 类图中，三个最常用的关系是关联（Association）、聚合（Aggregation）和组合（Composition），它们表示类之间的不同类型关系。
> 
> 
> *关联（Association）*
> 关联是一种表示对象之间的连接关系的关系类型。它描述了两个或多个对象之间的关系，它们可以相互交互，但彼此之间没有拥有关系。**关联可以是双向的，也可以是单向的**。在 UML 类图中，关联通常用一条带箭头的线表示，箭头指向关系的终点。例如，一个订单对象和一个客户对象之间的关联可能是一个双向的关联。
> 
> 
> *聚合（Aggregation）*
> 聚合是一种表示 “整体 \- 部分” 关系的关系类型。它描述了一个对象由多个组成部分组成，但这些组成部分可以从整体中分离出来并存在于其它地方。在 UML 类图中，聚合通常用一条带 **空心菱形** 的线表示，菱形指向整体。**例如，一个车库对象可以包含多个汽车对象，但是汽车可以存在于其他地方，如公路上或停车场。**
> 
> 
> *组合（Composition）*
> 组合是一种表示 “整体 \- 部分” 关系的关系类型，它比聚合更强，因为部分不能从整体中分离出来。组合表示一个对象由其组成部分组成，并且没有部分，该对象将不再存在。在 UML 类图中，组合通常用一条带 **实心菱形** 的线表示，菱形指向整体。**例如，一幅画由多个独立的形状组成，但是形状不能被从画中分离出来。**


##### [高赞博客](https://blog.csdn.net/m0_37989980/article/details/104470064) 的解释


* 关联，类 A 使用类 B 作为成员。![](https://s2.loli.net/2023/05/11/bNYKV4e9L1AdUkG.png)
* 聚合，“has\-a”的关系。![](https://s2.loli.net/2023/05/11/CBVUxQcqEFHs82M.png)
* 组合，“contains\-a”的关系。![](https://s2.loli.net/2023/05/11/DlWqFUydV4bfmI7.png)


### 包图 Package diagram


包（package）就像是命名空间（namespace）。


![](https://s2.loli.net/2023/04/22/ZN1Gjm6Q7Pa3uI9.png)


注意 containment 和 import 是两个不同的东西：
\- containment 有包含的意思。$A \-\\oplus B$ 表示 $A$ 是 $B$ 的一部分。并不等于 import。
\- import 的意思是，实现一个包，依赖于另一个包，跟 python 差不多。


![](https://s2.loli.net/2023/06/07/5BHVDbPRXwtoINK.png)


### 部署图 Deployment diagram


用于体现系统当中物理元素、逻辑元素与资源之间的关系。


![](https://s2.loli.net/2023/04/22/rOJQkcU4Kz2Swg9.png)


