# Lecture 11. 内存与动态、静态 RAM

$$\small z = \frac{1}{8} \left(10 e^{-\left(\left(\frac{2}{3}|x| - 1\right)^2     + \left(\frac{2}{3}y\right)^2\right) - \frac{1}{3}\left(\frac{2}{3}y + \frac{1}{2}\right)^3} + \frac{2}{3}e^{-2.818^{11}\left(\left(\frac{2}{3}|x| - 1\right)^2 + \left(\frac{2}{3}y\right)^2\right)^2} + \frac{2}{3}y - \left(\frac{2}{3}x\right)^4\right)$$

![image](https://s2.loli.net/2023/05/30/Or38ZwgAmxuiCn2.png)

## 主存（main memory）

### 比较 SRAM 与 DRAM

RAM 是随机存储器，Random Access Memory。

#### SRAM

*   由触发器构成
*   每个 memory cell 占据比较大的空间
*   易失
*   无需刷新
*   用于缓存
*   10ns 左右

#### DRAM

*   由 FET 以及存储的电荷构成
*   密度更大，同样体积，DRAM 存储空间可达 SRAM 的四五倍
*   易失
*   需要不断刷新（refresh）
*   60ns 左右

### 电路构造

#### SRAM

如图，想要存储一个 bit 的信息，需要 8 个 FET！

~~CS220 以及主流网站，都说只需要 6 个~~

![image](https://s2.loli.net/2023/05/30/8x2K1UoXm5NAWtG.png)

读写数据很快，只需要这样：

![image](https://s2.loli.net/2023/05/30/xtJiorj54PSn1Rh.png)

#### DRAM

![image](https://s2.loli.net/2023/05/30/4PORGSa5CMqiEyJ.png)

课件上说，每一个 bit 仅（大约）需要一个 FET。

*   Q：可是你这个图明明画了两个啊？
*   A：多出来的那个用来选择列号的。如果足够大，用于选择的可以忽略不计。如下图。RAS 表示 Row Address Select，CAS 类似。

![image](https://s2.loli.net/2023/05/30/WfmqgVQyJt9xCDw.png)

##### DRAM 循环

1.  选择一行 cell（row）
2.  把这些 cell 的数据都读出来
3.  找到对应的列。如果是 read mode，就把原始数据重新写回去，否则写入新数据
4.  为了防止存储的电荷流失，每个 cell 都要每隔 2ms 左右刷新一次
5.  在 re-read 之前，先给 cell 充电，这样下一次读取就会变快，这样可以让 DRAM 循环时间加快到访问时间的两倍左右（70ns）

### 内存条

有三种样式：

*   DIP，Dual in line package，两排引脚的小黑块
*   SIMM，Single Inline Memory Module，只有一侧有引脚
*   DIMM，Double Inline Memory Module，两侧都有引脚。常见的内存条就是这样

![image](https://s2.loli.net/2023/05/30/NcGMZArCy9lUVfm.png)

![image](https://s2.loli.net/2023/05/30/zveTyUufFB4wpDN.png)
