
Lecture 6 需求工程
==============



> 定义：The process of finding out, analysing, documenting and checking the services and constraints of a software system is called requirements engineering (RE).


需求就是指，系统应该实现什么东西，以及对系统行为的一些约束。需求工程（RE）就是找出、分析、文档化和检查这些实现和约束的过程。换句话说，需求工程就是为了得到一个共识的需求文档。


一般来说，需求有两个版本，一个版本是给用户看的（比较高层），一个版本是给开发者看的（比较底层、详尽）。


需求工程的过程
-------


主要包含三个核心步骤：


1. 抽取和分析（elicitation \& analysis）：与 stakeholders 进行沟通，了解需求
2. 规格说明（specification）：把需求标准化的写入文档
3. 确认（validation）：检查需求是否满足了客户需要


其中，stakeholder 可以翻译成「利益相关者」，也就是跟系统有 *利益关系（stake in the success）* 的个人或组织，比如开发者、维护者、销售人员、客户等。


![](https://s2.loli.net/2023/04/23/HzfJ4O6dKorWFVB.png)


上图基本以顺序的形式描述了需求工程的过程。但是在实际上，需求工程是 *迭代（iterative）* 而 *螺旋（interleaved / spiral）* 的一个过程。


![](https://s2.loli.net/2023/04/23/QHoYNe4vnwfKFtB.png)


注意上图可行性研究的英文拼写：*可行性（feasibility）*。


一、需求抽取 requirement elicitation
------------------------------


需求抽取，就是研究一下，这个东西用在什么方面，会包含什么步骤，系统应当有什么组件，系统应当具有什么特性（如：高并发性），系统的环境限制（比如政府网站要兼容 IE8），系统怎样被使用（客户端还是网站？）之类的。


### 需求抽取与分析的过程


四个步骤：


1. 需求发现和理解 discovery and understanding：与 stakeholder 交流，发现和了解需求以及 *领域需求（domain requirement）*
2. 需求分类和组织 classification and organization：把相关的需求整理到一个分类里
3. 需求优先级排序和协商 prioritization and negotiation：有时候可能涉及到多个利益相关者，于是就会发生需求冲突。就把这些人找来，商量商量，解决掉这个冲突和矛盾（conflict）。
4. 需求文档化 documentation：把需求写下来，可以是正式的文档，也可以记在小黑板上


#### 术语：领域需求 domain requirement


就是指，从系统应用的领域角度总结出来的需求（**derived from application domain**），而不是用户给定的需求


有的时候，用户可能根本不知道到底想要什么，或者说用户可能无法准确表达他们的意思。这时候就比较适合领域需求角度出发。


然而可能软件开发者也不太了解该领域（比如让 yyf 开发一个美术 app，但是 yyf 对美术领域一窍不通），这是一个缺点。


### 1\. 需求发现和理解 discovery and understanding


主要用到三种需求抽取技术。


#### 1\. 访谈 interview


访谈有助于获得一个大体的理解，包括用户要做什么、用户会如何使用系统等。


访谈有两种，一种是封闭式（closed）的，还有一种是开放式的（open）：


* 封闭式，类似面试，问题可能都提前准备好了（predefined），套话
* 开放式，形式比较自由，没有 predefined 的问题


#### 2\. 观察或人种学调查 observation \| ethnography


人种学调查是一种观察技术（observational technique），可以用来理解运行过程（operational processes），并且帮助得出支持这些过程的软件需求。


这个东西听起来挺玄乎的。其实说白了就是，有一个分析专员，投身到要用到这套系统的工作环境当中去，观察人们的日常工作是什么样子的，看看那里的人到底是怎么工作的，并记录下来。这样有助于发现一些隐含的（implicit）需求。


由于人们通常很难把工作细节描述清楚，此外可能有些人只了解自己的工作但是不了解自己的工作对于整体的工作是什么关系。所以，观察是特别重要的。万一有哪些关键细节没注意到，可能就会有严重后果。


#### 3\. 故事和场景 stories and scenarios


注意，这里的故事，跟用户故事，不是一回事儿。


故事和场景，本质上是同样的。它们拥有许多共同点：


* 描述系统如何用于特定任务
* 描述人们做什么以及人们如何与系统交互
* 描述人们使用和产生什么信息
* 描述在这个过程中，人们能使用什么系统


区别在于


* 故事比较偏向 *叙事化（narrative）*，是一种高层描述（缺少细节），有助于设定系统的概貌（big\-picture）
* 场景通常是按照特定信息（比如输入和输出）进行结构组织的，可以是故事的某个部分的更详细的表述


例如，有一个数字化学习系统名叫 iLearn，可能会有这样的情形：


![](https://s2.loli.net/2023/04/23/RW2ShuUeKZqVJXG.png)


对于上传照片的动作，可以细化成许多部分：


* 最初的假设 initial assumption，就是这个场景开始的时候，系统和用户应该是什么样子
* 常规 normal，即这个场景的流程
* 可能出现的问题 what can go wrong，可能出现什么问题，以及万一出错了怎么解决
* 其他活动，other activities，可能同时进行其他的活动有什么？
* 完成时的系统状态 system state on completion，顾名思义


![](https://s2.loli.net/2023/04/23/O3zPJtvhYHokyp7.png)


#### 需求抽取技术总结


* 访谈：有助于了解系统的 **大概情况**
* 人种学调查：有助于了解 **隐含的需求**
* 故事与场景：有助于了解用户的期望以及系统工作的 **流程**


### 2\. 需求分类与组织 classification and organization


#### 用户需求与系统需求


##### 用户需求 user requirements


通常用自然语言的 high\-level 的描述，读者通常主要是非技术人员：


* 客户方管理人员
* 合同管理人员
* 系统最终用户
* 客户方工程师


##### 系统需求 system requirements


详细描述软件系统的操作与限制，通常一个条目要分几个细项写，要实现什么都要准确的定义出来，读者通常是技术人员


* 系统架构师
* 软件开发者
* 产品经理
* 项目经理


#### 功能性与非功能性需求


##### 功能性 functional


就是指系统应当提供的服务、以及系统如何响应特定输入、还有系统在特定情况下（不）应该做什么。


应当用自然语言描述。


例：用户故事索引卡管理系统应提供导出功能，允许用户将所有索引卡保存在 PDF 文件中


##### 非功能性 non\-functional


是指对于系统提供的功能的约束条件，比如时间上的约束、关于资源的约束、标准规范的约束，等。非功能性的需求跟特定服务之间没有直接关系。


非功能性需求关注的比较偏向于系统整体，而不是局部。比如：性能、数据规模、易用性、可靠性、安全性、可移植性等。有的非功能性需求之间可能相互冲突，比如速度与稳定性，要寻求一个平衡。


非功能性需求通常也比功能性的更关键。比如如果缺失一个复杂操作一键化功能，用户可以分步骤解决；但是如果稳定性不满足需求（经常崩溃），那么这个系统可能直接就不能用了。


综合以上几点看来，非功能性需求，相比功能性的，一般也更加难以实现，需要一些技能。


此外，非功能性需求应当是 *可度量（measurable）* 的。比如，你要求某个情形下的性能，那么这个情形下处理一个数据，要在几秒内完成？


例子：当系统处于峰值负载时，不会丢弃从移动客户端收到的紧急消息，并且应在 10 秒内处理缓存的消息，并将组播到预选的接收方，不再延迟。


###### 非功能性需求的分类


* 产品需求 product requirement，约束了软件的运行时行为，比如性能、规模
* 组织需求 organizational requirement，比较宽泛（broad），比如用什么语言、运行在什么环境上
* 外部需求 external requirement，也比较宽泛，比如要符合法律、符合道德观念


![](https://s2.loli.net/2023/04/23/oOP5QtTFVpHiJEI.png)


###### 质量属性场景 Quality Attribute Scenarios


1. 刺激源 source of stimulus：就是发出刺激的人或物
2. 刺激 stimulus：就是能让系统产生响应的东西
3. 环境 environment：刺激发生所处的条件
4. 人件 artifact：系统或其中的某个部分
5. 响应 response：刺激引起的活动
6. 响应度量 response measure：用某种方法去度量响应，以此完成测试


### 3\. 需求优先级排序和协商 prioritization and negotiation


#### Utility Tree：对非功能性需求进行优先级排序


Utility tree 可以把非功能性需求划在一起。然后人们根据需求对软件架构和业务价值的影响，确定每个需求的优先级。


##### 构造 utility tree


* 根节点是占位符，标记为「utility」
* 第二层，是非功能性需求当中比较宽泛的几个大类（quality attribute）
* 第三层是对第二层的细化（refine）
* 需求以方案的形式被 capture


**买家** 和 **架构师**，对每一个场景进行评分（Low/Medium/High）。$(H, H)$ 是最为重要的，但是如果 $(H,H)$ 出现过多，也不好。


如图是一个 utility tree 的例子。


![](https://s2.loli.net/2023/04/23/sB1bkZfQXP98rC6.png)


### 附：可行性研究


主要分为业务方面和技术方面。业务方面考虑系统对组织结构和工作程序的影响以及成本效益问题，技术方面考虑实现方案是否可行以及项目时间规划等。


二、需求规格说明 specification
----------------------


主要有三种规格说明的方法：


* 结构化自然语言：在标准模板里面填写自然语言，面向的读者不一定能理解后两种表示
* 图形表示：用况图、顺序图等
* 数学表示：数学记号（有限状态机等）


### 结构化自然语言表示 Structured Natural Language


往一张卡片模板里面填字。例如：




| 名称 | 胰岛素泵的需求结构化规格说明 |
| --- | --- |
| **功能 function** | 计算胰岛素应用剂量，将血糖控制在安全水平 |
| **描述 description** | 当前测量到的血糖水平在安全区间 3\~7 倍单位的时候，计算要打多少胰岛素 |
| **输入 inputs** | 当前血糖值（r2），前两次测量的血糖值（r0 与 r1） |
| **来源 source** | r2 来自传感器，r0 与 r1 来自存储器 |
| **输出 outputs** | val：要打的胰岛素的剂量 |
| **目的地 destination** | 主控 |
| **动作 action** | 如果当前血糖正在下降或者上升变缓，那么 val\=0；如果血糖升高且越升越快，则 val\=\[formular]；如果 formula 计算结果是 0，那么就强行设置成最小剂量值 |
| **要求 requires** | （这里需要哪些信息）r0 与 r1（用于计算血糖变化率） |
| **前置条件 precondition** | 胰岛素余量充足 |
| **后置条件 postcondition** | r0\=r1，r1\=r2 |
| **副作用 side\-effects** | 无 |


但是这样的表述也存在缺点：


* consistency：有一个功能，开发者可能有的地方写「服务」，有的地方写「组件」，开发者认为这两个词是等价的。但是客户可能会觉得这是俩不同的东西。
* ambiguity：如果需求当中说，图床允许上传大图，可能有的人理解成限制 50MB，有的人理解成限制 1GB


### 图形表示：UML 用况图


参考 Lecture 5\.


### 数学表示：有限状态机


太简单，略


### 需求文档的 IEEE 标准


看样子是没有目录？


* 前言 preface：描述文档针对的读者人群、文档版本、修改总结等
* 引言 introduction：描述系统的功能、如何与其它系统一起工作、商业目标等
* 术语表 glossary：定义了文档中用到的术语
* 用户需求定义 user requirement definition：描述功能性、非功能性需求
* 系统体系结构 system architecture：关于系统架构和组件的高层概览
* 系统需求规格说明 system requirement specification：详细的功能性、非功能性需求
* 系统模型 system models：系统各个组件以及系统与环境之间的关系
* 系统演化 system evolution：描述系统基于的基本假设以及预期的变化
* 附录 appendix：一些与软件系统相关的详细信息
* 索引 index：字母序索引等


三、需求确认 validation
-----------------


### 需求确认过程


* 正确性检查 validity check：是否满足客户的真实需求
* 一致性检查 consistency check：对一个系统功能不能有两个不同的描述，要一致
* 完整性检查 completeness check：是否所有的功能和约束都被定义到了
* 现实性检查 realism check：这个系统能否依靠现有技术手段在预算内实现
* 可验证性检查 varifiability：能够针对每一条需求编写测试


### 需求确认技术


* 评审 review：
* 原型化 prototyping：开发一个可执行的系统模型。
* 测试用例生成 test\-case：


需求演变与管更
-------


由于原始需求可能存在错误和遗漏，以及业务环境的变化，难免出现新的需求。


### 需求演变


![](https://s2.loli.net/2023/04/23/lewGNjtSOAf5oVh.png)


### 需求变更


![](https://s2.loli.net/2023/04/23/hsWcKJbF5gBzVQH.png)


