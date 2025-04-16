
Chapter 4 Part 3
================


存储技术
----


存储有两种主要类型，易失的（volatile，如 DRAM）和非易失的（如闪存 flash）。所谓易失，就是指数据必须在通电状态下才存在。


易失半导体存储 volatile semiconductor memory
-------------------------------------


RAM，全称 Random Access Memory，也就是随机存储器，可以读也可以写。


然而实际上，有一些允许随机访问的存储器，不叫 RAM。


基于 RAM 的存储器系统，是面向字（word oriented）的，旨在最佳地匹配处理器架构，因为数 据可以以很容易与处理器数据总线宽度和寄存器⼤⼩相匹配的单元寻址。


RAM 设备可以 **⽆限次快速读取或写入** ，因此⽤于通⽤计算机存储系统。


RAM 又可以分为 Static RAM 和 Dynamic RAM 两类。这两种类型都易失。


### SRAM


对于 Static RAM 设备来说，它 use transistor based flip flop/feedback type
circuits to store the cell data, and will continue to hold the cell data while power is supplied. The memory cell’s value is maintained by the continuous flow of current. 也就是说，它基于触发器类型或者反馈类型的电路来实现单元数据的存储。并且只要保持通电状态就能够保存数据。而存储的内容是通过电流来维护的。


SRAM 的存储单元使用了两个反相器。而反相器是可以通过俩晶体管构造出来的。于是这个存储单元一共需要 6 个晶体管。


![](https://s2.loli.net/2023/01/07/lRau6AIjb275kZH.png)
![](https://s2.loli.net/2023/01/07/CsObYAIDx4aunyU.png)


#### 性能与应用


那么 SRAM 可以用来做什么呢？由于 SRAM 不需要频繁的连续刷新，所以 SRAM 的设备速度通常比较快，可以用于 processor cache memory（处理器缓存）


### DRAM


DRAM 存储数据，是通过电容充电实现的。每一个存储单元都由一个晶体管和一个电容器组成。晶体管相当于开关（控制电容是充电还是放电）。而电容是否有电，就代表了逻辑的 1 和 0\.


![](https://s2.loli.net/2023/01/07/XvRnEpGjJ6QLb9I.png)


既然是充电放电，那么就需要时间。电容的充放电图象类似反比例函数，先快后慢的。


事实上每一个电容都很小，电容量也很小，只有数百分之一皮法拉。


然而电容充电之后可能还会漏电。所以，逻辑 0 可以永久保持，但是逻辑 1 就需要持续供电才能保持。正因如此，必须不断地感测、放大、重写电路。最大的重写区间是有标准规定的，比如 DDR2 标准规定的时间是 64 毫秒。


#### 性能分析


读取操作会伴随着电容放电，也就意味着具有破坏性。而刷新操作期间，会禁止访问。也就是说，访问必须与刷新同步。这最终导致 DRAM 比 SRAM 慢。


#### SRAM vs DRAM


DRAM 的存储单元比触发器的小很多，所以单位密度（容量）可以做的更大，这就让 DRAM 变得很便宜。所以一般电脑主要内存都是 DRAM。


然而 DRAM 需要不停的刷新，这性能消耗比较大。所以对于高速缓存（cache memory），还是使用 SRAM。


### DRAM 的结构


比如，1GB 的 DRAM，可以视作 1G x 8bits 的逻辑字。整个阵列，拥有 32768 个物理字，而每一个物理字包含 32768 个 8\-bit 大小的逻辑字。


于是，寻址需要 30 位。


此外，存储设备还由外部信号 RAS（⾏地址选择）、CAS（列地址选择）、W（写⼊数据）、OE（输出使能、读取数据）控制。


![](https://s2.loli.net/2023/01/07/xAfQo2lvyrq164F.png)


一堆这样的 1GB 的东西串到一起，就形成了一个 4G/8G 的内存条。


### DRAM 性能增强


可以使用更宽的总线（data buses）、更多的通道（channels）、更复杂的控制接口（control interfaces）。


此外，burst mode 可以形成缓冲（类似堵车的时候信号灯作用），module interleaving 可以把连续的操作分配到不同的阵列上，就像大马路有好多行车道一样。


同步总线接口（synchronous bus interface）拥有更高的吞吐量和缓冲，能使得内存操作更加顺畅。


非易失存储技术
-------


ROM 全程 Read Only Memory，是只读存储器的意思。ROM 可以实现数据永久保存，不需要持续供电。


**ROM 和 RAM 的访问速度一样快**。


ROM 的典型用途之一，就是用来存储硬件的基础设置，比如 BIOS 之类的。因为这类硬件设备的参数啥的可能永远都不会变。此外，许多电子设备第一次启动都需要有一定的引导，这类引导代码也是通过 ROM 存储的。


### PROM 与 FPROM


PROM 是可编程 Programmable ROM 的意思。类似地还有一种叫做 FPROM，是 field programmable ROM 也就是现场可编程 ROM。这俩都挺便宜的，也都可以当作 PROM。


PROM 是一种早期技术，一次写入，多次读取。


PROM 出厂的时候，有好多保险丝（fuse）。编程过程就是使用更高的电压，烧断指定的保险丝。这些保险丝如果断了（blown out），那么这个位置的存储就从预设的 1 变成 0\. 因此，只能写入一次数据，而且烧保险丝其实是比较缓慢的，不能大规模生产。


现代可写非易失存储
---------


这种技术是基于 **floating\-gate 浮栅晶体管** 的。


（25\-35 页有关于这种晶体管的详细介绍）


### EPROM


EPROM ，erasable programmable ROM，可擦除可编程 ROM。是比较老的一种技术，seldom write mostly read，也就是写入不多，通常只是读取。


出厂的时候，每个 bit 的值是用高于正常值的电压写（编程）进去的。这个时候它就相当于一个普通的 ROM 了。


然而神奇的是 EPROM 设备拥有一个紫外窗口，如果接受大约二十分钟的紫外线照射，那么存储单元就会被擦除，然后你就可以重新编程写入数据。正因如此，EPROM 比 PROM 贵不少，然而它改善了只能写入一次的窘况。（这个紫外线照射的过程可能需要人工操作）


### EEPROM


也是一种老技术，是 electrically erasable programmable ROM，电可擦可编程的 ROM。也是 seldom write，mostly read 的东西。然而这种的只能存储 **少量数据**，比如配置信息之类的。


这玩意儿的优点就是，擦除比较方便，可以 being update able while in the computer, because it can be read and written externally in the same way as RAM.


### 闪存 Flash


依然是 seldom write，mostly read 的东西。其实是 EEPROM 的一种。


像 U 盘，固态盘，SD 卡啥的，都属于闪存。


这玩意儿便宜，容量大，性能也还不错，功率不高。但是当然不如 RAM 快。在移动设备方面卖得非常好。由于不含有机械部件，所以相比机械硬盘，可以承受更严酷（harsher）的操作环境。


与 EEPROM ⼀样，单元的寿命有限，块擦除/写⼊会更快地缩短设备单元的寿命。此操作由⽚上擦除电路完成，⽐读取操作慢很多。对于 SSD 来说，还会有一些管理存储和磨损平衡的算法。


闪存分为一些不同的等级。比如 SD 卡，有一个叫做 UHS 评级的东西。不同等级对应着不同的最劣性能。


存储器总结
-----


![](https://s2.loli.net/2023/01/07/z9YpLlihcWkNSQn.png)


