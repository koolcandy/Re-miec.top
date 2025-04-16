
Lecture 8\. 晶体管和 FET
====================


NPN 三极管
-------


晶体管也是一种电子元件，不过他与二极管不同。晶体管有三个或更多的接线柱，常用来控制电流。


课件中最先介绍的是 *结型晶体管（junction transistor）*，貌似也称作 BJT，俗称三极管。顾名思义，由 PN 结构成，且有三个接线柱。


BJT 由三部分构成：*发射极（emitter）*、*基极（base）*、*集电极（collector）*。课件给出的 BJT 是 NPN 类型的（发射极和集电极是 N，基极是 P），也有 PNP 类型的。


BJT 有两个 PN 结，两个 PN 结共用的电极就是基极。


![](https://s2.loli.net/2023/05/23/NdKGxMST1FnAUCQ.png)


在三极管当中，流经三部分的电流满足关系 $I\_E \= I\_B \+ I\_C$，而 $I\_C \= \\beta I\_B$，其中 $\\beta$ 取值是数十或数百。也就是说，流经集电极的电流是基极电流的几十几百倍。这个叫做 *电流增益 current gain）*。所以三极管可以用基极 **对集电极的电流进行控制**。


### 应用：构造一个 NOR 门


$\\operatorname{NOR}(A, B)$ 的输出为真，当且仅当 $A\=B\=0$。


* 如下电路，当且仅当 $I\_A \= I\_B \= 0$，$I\_E \= 0$，此时三极管相当于一个大电阻。于是电流只能流向 Output
* 若 $I\_A \+ I\_B \\not\= 0$，则 $I\_E \\not\= 0$，此时输出线被短路，电流全部流向 $I\_E$


![](https://s2.loli.net/2023/05/23/RjegrBa2WCzFQ7S.png)


金属氧化物半导体场效应管（MOSFET）
--------------------


https://www.elprocus.com/mosfet\-as\-a\-switch\-circuit\-diagram\-free\-circuits/


* M 表示金属，O 表示氧化物，S 表示半导体。
* FET 是 field\-effect transistor 的缩写，即利用电场对导电性进行控制的晶体管。


![](https://s2.loli.net/2023/05/29/sjK1luWRdF9Tp3H.png)


通道（Channel）的宽度与 *抵消区域（depletion region）* 基本相同。


课件上给的图太简陋了，简直是垃圾。


### 原理


有一个动画演示网站，可以演示 NMOS 和 PMOS 的


* https://www.falstad.com/circuit/e\-nmosfet.html
* https://www.falstad.com/circuit/e\-pmosfet.html


#### NMOS（电流 D \-\-\> S，NDS，G 接正）


先以 NMOS 为例（课件上给的垃圾例子也是 NMOS）


NMOS 的衬底是 P 类型的半导体，S 和 D 都连着 N 类型半导体。两个 N\+ 之间的区域是 depletion region，也是 channel。现在 G 没有正电压，P 的洞洞跟 N\+ 的电子相互抵消，不导电。


![](https://s2.loli.net/2023/05/29/pXVZsFxa3zAevfS.png)


**如果 G 有了正电压**，那么 N\+ 里面的电子被吸引到中间来，中间的洞洞被排斥到下面去。于是形成了一条电子可以流动的通道。于是就导电了。


D 要接电源正极，S 要接电源负极，电流方向 D \-\-\> S。


![](https://s2.loli.net/2023/05/29/nxg8pS1IByq2tcQ.png)


#### PMOS（电流 S \-\-\> D，PSD，G 接负）


衬底是 N，S 和 D 连接到两个 P\+。


**当 G 电势较低（接地**），则两个 P\+ 中间的洞洞被吸引出来，衬底 N 的电子被排斥开，形成了一个洞洞可以自由流动的通道，从而导电。


### MOS 的电路符号


* **增强型，就是 G 实线，SD 虚线**
* 耗尽型一般不太关注


#### NMOS 增强型器件


![](https://s2.loli.net/2023/05/29/r5MNDVOaB9LoEYh.png)


#### PMOS 增强型器件


![](https://s2.loli.net/2023/05/29/JpzoTNUadGlAbug.png)


### 互补式金属氧化物半导体 (CMOS) 实现 NOT 门（反相器）


全称 Complementary Metal Oxide Semiconductor。


图中从上到下，P 和 N 的四个极，是 SDDS。


![](https://s2.loli.net/2023/05/29/qjph3O9RrmDYlkP.png)


* 当 $V\_I \= 0$，则 PMOS 导通，NMOS 关闭，Vdd 跟 $V\_O$ 一样，输出 $1$
* 当 $V\_I \= 1$，则 PMOS 关闭，NMOS 导通，Gnd 跟 $V\_O$ 一样，输出 $0$


![](https://s2.loli.net/2023/05/29/iuETDeAsXZOaI91.png)


硅：应用
----


### 粗硅提纯


1. 捞一把沙子（SiO2）
2. 高温，用碳还原：SiO2\+C \= CO2 \+ Si
3. 加盐酸：4Si\+6HCl \= 4HSiCl3\+H2，得到硅酸
4. 把硅酸放在氢气中加热，得到纯硅：4HSiCl3\+H2 \= 4Si\+6HCl


加热的时候要使用石英坩埚（quartz crucible），避免副反应。


### Czochralski Process（提拉硅晶体）


应该不重要吧，不看了


### 刻蚀


SiO2\+4HF \= 2H20\+SiF4


### 构造设备


应该不重要吧，不看了


