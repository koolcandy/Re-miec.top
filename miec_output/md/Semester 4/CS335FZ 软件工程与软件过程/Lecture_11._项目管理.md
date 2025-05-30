# Lecture 11. 项目管理

## 项目管理成功的标准

通过撰写 proposal、安排计划和时间表、管理风险、监控项目进度等。实现以下方面：

*   按照约定的时间把软件交付给客户
*   将全部成本控制在预算 budget 之内
*   所交付的软件要满足客户的期望
*   保持开发团队的凝聚力与良好状态（happy）

如有需要，可以建立一些关键里程碑（milestone）时间节点，用于评估进度，比如这样：

![img](https://s2.loli.net/2023/06/20/whLlFnW4iXCctsT.png)

## 项目计划

典型的项目计划过程的工作流程，可以用 UML 活动图来描述，是个迭代的过程。

![image.png](https://s2.loli.net/2023/06/20/mrVQT5vjCGqBMkO.png)

## 项目时间规划

说白了就是，项目经理要负责把整个大项目分解成若干个小任务（一到两周），对于每个小任务，找出其前置任务（即依赖关系，并尽量最小化等待时间），以及估计需要的时间。有些任务是可以一起搞的（比如烧水和煎鸡蛋），这些可以给员工进行合理的分配。

*   活动 activity，是一个项目，应当产生输出，让项目经理判断项目进度。拥有如下属性：
    *   duration，即需要多久
    *   effort estimate，即人月/人日
    *   ddl
    *   终点
*   里程碑 milestone，相当于项目阶段的一个逻辑终点，可以接受一次评审
*   可交付 deliverable，是项目交付给客户的成果

可以用 bar chart 或 activity chart 实现项目时间规划的可视化

### 用 Activity Network 实现可视化

![image](https://s2.loli.net/2023/05/31/amc3F1RTuN2jodE.png)

根据表格构造出来一个像是拓扑图的东西。注意记得画上 `Start` 和 `End` 节点

![image](https://s2.loli.net/2023/05/31/54xVzPpLSybhIOK.png)

然后就能找到 critical path（最长的那条）了。

critical path 上的任务不能 delay，否则就会导致整个项目被 delay。

### 用 Gantt Chart 实现可视化

下图 T 是 Task 的缩写，M 是 milestone 的缩写。

![image](https://s2.loli.net/2023/05/31/nUgRQ7G6cESyWVl.png)

CS240 的进程调度部分，也有 Gantt 图~

### 职员分配图

除了进度安排，还要考虑资源分配，尤其是人员分配。其中画了斜线的格子表示兼职工作，可能这个人是外聘来的。

![image](https://s2.loli.net/2023/05/31/HbhOC6jDqkgK4I1.png)

## 风险管理

风险是指有可能发生的不利的事情，有三类：

*   项目风险 project risk，比如员工集体感染新冠，会影响整体的进度和资源
*   产品风险 product risk，比如某个部件出现了 bug，会影响整体软件的质量或性能
*   商业风险 business risk，比如业务被别的公司抢走了，或者客户突然大改合同

风险管理：识别风险并对齐进行分析和评估，然后制定计划，不断监测风险严重程度的变化，尽量减少风险带来的负面影响。这是个迭代的过程，如图：

![image](https://s2.loli.net/2023/06/20/DLlm8wrSKHZnIAx.png)

### 应对风险的策略

*   尝试降低风险的概率 avoidance
*   尝试降低风险的影响 minimization
*   针对风险制定应急策略 contingency
