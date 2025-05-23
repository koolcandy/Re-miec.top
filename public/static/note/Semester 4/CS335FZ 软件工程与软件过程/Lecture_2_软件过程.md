
Lecture 2 软件过程
==============


瀑布模型 Waterfall model
--------------------


是第一个被提出的软件开发过程，起源于大型军事系统工程当中使用的一种工程过程模型。


它是一个 *计划驱动（plan\-driven）* 的过程。**要开始软件开发之前，对所有的过程活动进行计划和进度安排**。


原则：前一个阶段完成之前，不进行下一阶段。When finished last step, continue next.


![](https://s2.loli.net/2023/04/17/h9P8k1QZiYqgzC3.png)


### 优缺点


![](https://s2.loli.net/2023/03/01/7hWeCGLs3Pz4SNa.png)


### 应用


* 嵌入式系统（embedded system），因为硬件通常不是很灵活，所以不能把对于软件功能的 **决策** 推迟的开发的时候再进行，因此适用于瀑布模型
* 关键性系统（critical system），这种系统要求 **规格说明书必须分析全面**，文档必须完整。
* 大型软件系统（large software system），多家企业合作开发，所以需要 **完整的规格说明书**，才能让不同的子系统独立开发。


然而，如果是需求会快速发生变化的软件，就不适用瀑布模型。


V 模型
----


是瀑布模型的一种变体。


同时注重 development 和 testing。每个阶段，有的人负责设计，有的人负责编写测试用例。每个阶段都要有 verification 和 validation。


然而，不适用于那些不容易实现更改的项目。也不适用于长期项目。


![](https://s2.loli.net/2023/04/17/rQM3dlbImyThZiN.png)


增量开发 incremental development
----------------------------


一开始只有一点点，然后不断的从用户那里获取反馈，然后根据反馈往里面加入新东西。经过多个版本的演化，最终形成最终版本。


规格说明、开发、确认（validation）三个步骤是交织在一起（并行）的。


写一点，就测一点，以此来降低风险。而且在开发过程中可以很轻松的进行更改。


![](https://s2.loli.net/2023/04/17/lLEykCJYx7nMVte.png)


### 优缺点


优点：


* 当需求发生变化，**重新修改文档的工作量相对很低**
* 可以 **及时的从用户处获取反馈**
* 先发布一个版本，具有主要功能，如果用户有新增需求，以后再添加进去。换句话说，**用户可以更早的使用上软件**。


缺点：


* 过程不可见。通常领导需要下属上交报告啊之类的，来了解开发的进度。但是如果开发过程很快，每一个小更新，都要给领导交一份报告，这很不现实。换句话说，要产生反映系统每一个版本的文档，这不划算。
* 当不断加入新功能，可能会影响项目的管理负担和项目结构，然后就越来越复杂，往里面假如新东西就会越来越难。敏捷开发通过重构（refactoring）来解决这个问题。
* 不适用于长期维护的项目和大型项目。


螺旋模型 Spiral model
-----------------


是一种 *风险驱动（risk\-driven）* 的模型，了解即可。


螺旋当中的每一个循环表示软件过程当中的一个阶段。于是：


* 最里面的循环主要关注系统可行性
* 接下来的循环，主要关注需求定义
* 然后关注系统设计


螺旋模型，假设 *变更（change）* 是项目 *风险（risk）* 的结果。因此包含了显式的风险管理，来降低这些风险。


![](https://s2.loli.net/2023/03/01/8s1wAH3JSiZzbXq.png)


几个术语
----


### 验证 verification


检查一个系统是否符合规格说明（内部的）


### 确认 validation


检查系统是否满足了客户的需要和期望（外部的）


### 重构 refactoring


就是修改软件内部的结构，改进结构及其可读性，降低将来修改的成本，但不改变其功能。


### 原型 prototype


原型是系统某些功能子集的临时的实现，通常呈现给用户进行反馈和确认，然后在确认工作完成后丢弃。


也就是软件系统的一种早期版本，用来演示概念、尝试候选方案等。


### 概念验证 proof of concept


概念验证，是对某些想法的一个较短而不完整的实现（代码），以证明其可行性，示范其原理，其目的是为了验证一些概念或理论。概念验证通常被认为是一个有里程碑意义的实现的原型 。


### 骨架系统 skeleton system


骨架，就是实现了系统的主要结构，但也仅仅包含最小的一部分功能。它会被保留着，而不是被丢弃掉。


骨架，也叫做进化原型 evolutionary prototype。


集成与配置 integration and configuration
-----------------------------------


这里的集成是指，开发者在开发过程中，发现已有的一部分代码与现在的需求相似，就把那部分代码直接集成过来（或许会做一些修改）。然后，进行一定的配置，比如环境配置等，使这个外来的部分能与原系统一起使用。


面向 **复用** 的软件工程，其基本流程如图所示


![](https://s2.loli.net/2023/04/19/WfhZzuXtwLoSlIx.png)


* 其中，「软件发现」和「软件评估」是比较新的词，说白了意思就是，根据规格说明，搜索现成的东西，看看能不能用。
* 「需求精化（refinement）」表示根据可重用的构件，对需求进行一定的修改。


### 优缺点


由于现有的可用的构件，一般都是被测试验证过了的，比较稳定，所以可以降低风险，还能让整个开发周期变得更快。


但是可能导致所开发出来的系统，不满足用户需求初衷。而且有可能构件当中使用了比较旧、弃用了的东西，导致不兼容，失去对系统演化的控制。


统一过程 unified process（UP）
------------------------


Rational 公司是早期开发统一过程的投资者，所以这个也称为 Rational unified process（RUP）。


![img](https://s2.loli.net/2023/04/19/4cqBoSiUOZmWua9.png)


统一过程（UP）有好多个阶段：起始、细化、构建、转换、生产。


![img](https://s2.loli.net/2023/04/19/gG2PdALi5IDZpWv.png)


### 1\. 起始阶段 inception phase


包含与客户的沟通和策划。首先根据需求，提出 **大致的** 架构，制订初步计划，分析非关键的重要功能（安全性等），保证项目具有迭代和增量的特性，也就是准备开发环境。


此外，使用 *用例（cases）* \=\=还是用况？\=\= 来描述用户所需的特性和功能。 


### 2\. 细化阶段 elaboration phase


扩展初始阶段的用况（例），对核心的、有风险的结构进行测试。确立了大部分的需求，风险降低。


这个阶段可能有一系列的迭代。


### 3\. 构建阶段 construction phase


这个阶段主要关注系统各个部分的开发、测试，并集成。


这个阶段相当于对细化阶段的完善，产生了软件增量（如发布的版本）。


### 4\. 转换阶段 transition phase


就是系统构建后期，以及部署。完成这个阶段后，软件增量配套设施（文档等）就应当完备，可以投入使用。


### 5\. 生产阶段 production phase


不重要，略


