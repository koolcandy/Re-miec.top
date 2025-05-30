# Chapter 2 Part 2: 一些硬件知识

（共 33 页）

## 晶体管 transistor

*开关电路理论（Switching Theory）*，大概就是关于，用开关来实现布尔表达式和逻辑门的数字电路。

晶体管是一种半导体，是当代电子设备的关键元器件，于 1947 被发明。晶体管可以用于构造更小、更快、更节能可靠的电路。一定数量的晶体管组合在一起，可以构成复杂的集成开关电路。因为晶体管可以调控通过它的电流或者电压。

晶体管的结构主要是 *gate*、*source*、*drain* 三个部分。晶体管主要分为 *n-type* 和 *p-type* 两种类型。在图示当中，p-type 的 gate 部分有一个圆圈，而 n-type 没有。因为英文字母 p 带个圈。

![image-20220928161400285](https://s2.loli.net/2022/12/06/e4VaQNfiumnAYjx.png)

对于 n-type 的晶体管而言，若不对 gate 施加电压（ground），则晶体管相当于开路，source 和 drain 之间断开。若施加电压（比如 3V），则变成闭路，source 和 drain 连接起来。p-type 的晶体管则刚好相反。

~~注：貌似在国内教材当中，n-type 是带圈的，p-type 是没圆圈的。~~

~~这个晶体管应该不是重点内容，感觉了解即可~~

## 布尔运算的晶体管实现

### NOT 运算（Inverter）

如图。X 是输入信号。X 同时连接到了一个 n-type 晶体管和一个 p-type 晶体管的 gate。Y 是输出端。

*   当输入信号是 3v，图例下方的 n-type 晶体管闭路，会让 Y 的电势成为 0V
*   当输入信号是 0v，图例上方的 p-type 晶体管闭路，会让 Y 的电势成为 3V

因此实现了 inverter 的作用。

![image-20220928161832199](https://s2.loli.net/2022/12/06/OQ6xGXgc9VMspWn.png)

### OR 运算

如图。实现 OR 运算的电路仅需并联两个 n-type 的晶体管开关。任意一个 n-type 晶体管被施加电压，都会导通电路。

![image-20220928162918936](https://s2.loli.net/2022/12/06/igklSFR2acI95PC.png)

### AND 运算

如图，两个 n-type 的晶体管开关串联即可。

![image-20220928163048881](https://s2.loli.net/2022/12/06/w9xynPTtJ5rREqU.png)

## 门传播延迟（Gate Propagation Delay）

当一个布尔表达式比较长（大于等于两个最小项的 SOP 形式），用电路实现的话可能会很复杂，需要很多 gates。若转化为 NAND 形式的布尔表达式，通常可以减少所需要的 gates 的数量。

而且，根据电路实现的不同，gates 在输出的时间，相对输入的时间，都会有一定的 *门传播延迟（Gate Propagation Delay）*。这个延迟时间会随着电路所使用的 gates 的数量增加而增加。因此，简化表达式和电路显得更加重要。

当然，化简表达式并不一定是需要弄成 NAND 形式。有时候 SOP 可以用分配律（类似于提取公因式）来简化。
