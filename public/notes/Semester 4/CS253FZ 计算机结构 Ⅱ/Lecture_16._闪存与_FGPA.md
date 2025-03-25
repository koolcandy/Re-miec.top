# Lecture 16. 闪存与 FGPA

## 闪存

闪存是从 EEPROM 的基础上发展而来的，可以多次写入和擦除。有点像 RAM，但是非易失（non-volatile）

### 闪存结构

![flash_structure](https://s2.loli.net/2023/07/03/RbQ6yqG1hzMWA3t.png)

闪存的结构单元如图所示。主要就是由一个 *存储晶体管（storage transistor）* 构成，这个晶体管类似于 n 类型的 mosfet。

这个晶体管里面有两个 gate，一个是 control gate（控制栅极），另一个是 floating gate（浮动栅极）。两个栅极之间由绝缘的金属氧化物隔开。

浮动栅极当中存有电荷，可以控制电流的流动。

### 闪存原理

当控制栅极上接了电源正极，S 和 D 当中的电子就会穿过绝缘层，进入浮栅。然后这个晶体管就导电了。这表示“1”。

假如控制栅极接了负电压（也就是相当于衬底有一个正电压），那么电子就会穿过绝缘层，重新回到 S 和 D。于是不能导电了，表示“0”。

由于绝缘层的存在，在闪存不通电的时候，电子仍然会保存在浮栅当中，所以闪存是非易失的。

### NAND vs NOR

闪存分为 NAND 类型和 NOR 类型的。

*   NOR 类型并行连接各个单元，因此可以实现高效率的随机访问
*   NAND 晶体管都串在一起，所以比较适合连续访问；而且 nand 类型的存储单元更加紧凑（compact），也就是说同等体积的闪存，NAND 的容量会更大一些
*   NOR 的单位是 byte，NAND 的单位是 page
*   NOR 的读取很快，但是写入比 NAND 慢
*   NOR 的内存单元更贵
*   NAND 更省电

### 固态硬盘 SSD

固态硬盘是一种闪存。由于闪存跟硅有关，硅是固体，所以叫固态硬盘（好牵强）

有的 SSD 使用跟 HDD 一样的接口（SATA），有的用 PCIe 接口，还有的用 DIMM 接口，形式很多。

![ssd_interface](https://s2.loli.net/2023/07/03/Dg3c2VY6KNu5QjU.png)

有一种怪胎，是把 SSD 和 HDD 混合了，速度快，容量也可以大。

#### 与 HDD 的比较（优缺点）

*   SSD 不需要磁头移动就可以存取数据，所以比较快，而且噪声小，而且故障率也低
*   SSD 比较贵，而且一旦数据丢失，很难恢复；而且 SSD 的容量比不上 HDD

### 闪存优缺点

#### 优点

1.  所有半导体存储当中，最便宜
2.  非易失，而且功耗低
3.  想要高随机访问速度可以选择 NOR，想要高连续读写速度可以选择 NAND
4.  稳定性高，不怕磕碰
5.  延迟低

#### 缺点

1.  容量做不了 HDD 那么大
2.  写入或擦除次数过多会破坏氧化层，因此寿命有限
3.  如果比较多的位置数据损坏，HDD 可以继续用，但是 SSD 可能整个就废了，难以读取

## FPGA（现场可编程门阵列）

Field Programmable Gate Array。

FPGA 是一种 SSD 设备。通过硬件描述语言（HDL）描述的电路，可以烧录（burn）FPGA，然后就可以弄到 ASIC 芯片上面。这种芯片非常非常便宜。所以微波炉这样的常见家用电器，用 FPGA 就会很便宜。

微控制器也可以执行不同的功能，但是微控制器的底层电路是固定不变的，变化的只是微控制器执行的程序；与微控制器不同的是，FPGA 可以通过编程，变成截然不同的电路。

### 结构

![fpga_structure](https://s2.loli.net/2023/07/03/g5BntZjHwLpsoDR.png)

*   I/O 模块允许 FPGA 与外部世界连接。
*   软逻辑模块包含查找表、多路复用器和移位寄存器。这使得可以使用它们构建任何组合逻辑或时序电路。
*   交换模块、连接模块和路由通道允许在软逻辑模块之间以及不同模块之间进行灵活连接。 内存模块和乘法器构成了本示例中的硬逻辑模块。在实际的 FPGA 中，硬逻辑模块可能包括通信模块、数字信号处理模块，甚至整个微处理器。
*   HDL 程序通过使用闪存 RAM 设置不同部件之间的连接，以允许或阻止电流在不同部件之间流动。
*   连接可以在需要时被擦除，例如在调试期间或项目完成后，可以将 FPGA 用于其他目的。

### Verilog

是最常见的一种 HDL。

相比于工业性的 VHDL，Verilog 学起来特别简单，而且 VHDL 该有的功能，Verilog 基本都有。

#### 示例：verilog 描述 SR 锁存器

![sr_latch](https://s2.loli.net/2023/07/03/uB8T4mA5HqrliNv.png)

```verilog
module SRlatch(output Q, Q_bar, input S, R);
  nor N1(Q_bar, S, Q);
  nor N2(Q, R, Q_bar);
endmodule
```

#### 示例：verilog 描述 D 触发器

![d_ff](https://s2.loli.net/2023/07/03/LQybcAIdK5etSZY.png)

```verilog
module Dff(output reg Q, output Q_bar, input D, clr, clk);
  assign Q_bar ~Q;
  always @(negedge clr)
    Q = 1'b0;
  always @(posedge clk) begin
    if (clr != 0) Q <= D;
  end
endmodule
```
