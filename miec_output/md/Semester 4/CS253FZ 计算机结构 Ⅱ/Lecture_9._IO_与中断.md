# Lecture 9. IO 与中断

**关于中断这一节，区分清楚 中断编号 以及 IRQ 编号，很重要。**

## 复习：四种周期

这里补充说明一下三种周期分别是啥：

*   时钟周期 clock cycle，是时钟频率的倒数，是 CPU 最小动作单元
*   机器周期 machine cycle，就是机器循环（fetch-decode-execute-store），由若干时钟周期构成
*   指令周期 instruction cycle，就是指执行一条指令需要的时间。由于不同指令复杂程度不同，不同指令的指令周期也不一定相同，但至少是一个机器周期
*   总线周期 bus cycle，是不同组件中传输数据所需要的时间

## 8086 结构

先来看看 8086 的长相和引脚布局图：

![8086结构](https://s2.loli.net/2023/05/23/FZnwR9X62iUWhCo.png)

![8086引脚布局](https://s2.loli.net/2023/05/23/yN23qxkEgHuBhrK.png)

8086 的内存总线是 20 位的，数据总线是 16 位的。

I/O space 是指用于与外部设备进行通信的地址范围，它跟内存是两码事儿。由于数据总线只有 16 位，所以 I/O space 只有 64K 的大小。

由于 8086 硬件引脚的局限性，内存总线和数据总线共享引脚。所以需要一条额外的控制线来区分，要访问内存还是数据。

由于 8086 的地址和数据总线多路复用了，所以处理器通过总线对外部（内存或 I/O 接口）进行一次访问，需要四个时钟周期，即：**8086 的一个总线周期等于四个时钟周期**。

## Z80A CPU 的结构

相比 8086，Z80A 的数据总线和地址总线分开了，如图。

![Z80A数据总线和地址总线](https://s2.loli.net/2023/05/23/pC92Sr8dOYbTUFW.png)

有一个巨大的 AND 门充当地址解码器的作用。它有 16 个输入，当且仅当 16 个输入构成了对应设备的地址，才会输出真，否则输出假。此外，还有两根控制线（绿色、紫色），表示是否要对该设备进行操作。

![AND门地址解码器](https://s2.loli.net/2023/05/23/8kg1jpiynADZW4Y.png)

然后，三个值再与一下，作为控制信号传送给一个三态缓冲器。三态缓冲器的作用是，根据控制信号决定，把输入原封不动传给输出，还是高阻态。

![三态缓冲器](https://s2.loli.net/2023/05/23/QC4m9yvVDl1XNYr.png)

对于输出，也差不多，只不过是三态缓冲器换成了 D 缓存器。

![D 缓存器](https://s2.loli.net/2023/05/23/jmoeEAQp4RLSBwH.png)

## 汇编的 IO

### `IN` 与 `OUT` 指令

语法是 `in/out ax/al dx/imm8`，作用是从指定端口当中读取数据到累加器寄存器。

当使用 imm 的时候只可以访问 256 个不同的端口，使用 dx 可以访问 64k 个端口。

==方向反了？？==

#### 关于权限

对外部进行读写，那肯定是需要权限的。

8086 当中有一个叫做 IOPL（Input/Output Privilege Level）的标志，长度是 2 位，表示 IO 的权限等级。一般来讲 IOPL=2 就够了（最高是 3）。

此外还有一个叫做 I/O permission bitmap 的东西。这个东西是 8 字节的，总共 64k 个布尔位，分别表示对应的 64k 个端口是否具有权限。

### 一些众所周知的端口地址

*   并行打印机锁存器（parallel printer latch），有两个并行端口（parallel port, LPT)，LPT1 的地址是 0x378，LPT2 的地址是 0x278。不过现在这东西不常见了，都是 usb 了
*   打印机控制锁存器（printer control latch），0x37a
*   打印机状态：0x379，一般是输入
*   VDU（video display unit）颜色寄存器，用来控制 DOS 窗口颜色的显示，0x3d9

### DOS 屏幕显示

屏幕左上角的地址是 B8000，即 B800:0000。每个位置占用两个子节的内存，DOS 屏幕宽度是 80 个字符，所以每行内容占用 160 字节的内存。DOS 屏幕高度只有 25 行，所以整个屏幕能显示 2000 个字符，占用 4000 字节的内存。

对于每个字符的两个字节来说，第一个字节用 ASCII 表示这个位置上的字符是谁，第二个字节用来指定显示格式，即文字颜色、背景颜色、是否闪烁、是否增亮：

![屏幕颜色](https://s2.loli.net/2023/05/26/XkqF7BExDM4TtIy.png)

Lab5 的第二道题实现了屏幕显示控制。

## 8259 可编程中断控制器

8086 使用两个 8259 芯片（一主一从），可以处理 0~15 共计 16 个中断。

其中，主 8259 处理中断 0~7，从 8259 芯片处理中断 8~15. 从芯片连接到主芯片的 irq2 引脚上（所以实际上相当于少一个，只能处理 15 个中断）

![8259芯片](https://s2.loli.net/2023/05/24/WNk3s8ZbnYGIHUD.png)

16 个中断都有编号，如表格。

**前 8 个 irq 的 int 编号是从 08 到 0f，后 8 个的 int 编号是从 70 到 77。**

| int 编号                                                                                             | irq 编号 | 描述             | 详述                                                                                                                                                                                                                                           |
| :--------------------------------------------------------------------------------------------------- | :------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [INT 08H](http://www.techhelpmanual.com/105-int_08h__timer_interrupt.html)                           | IRQ 0    | Timer，时钟        | Interrupts every 55ms (18.2 times per second)                                                                                                                                                                                                     |
| [INT 09H](http://www.techhelpmanual.com/106-int_09h__keyboard_interrupt.html)                        | IRQ 1    | Keyboard，键盘     | Interrupts on each press and release of a key and periodically while the key is held down. See [Keyboard Ports](http://www.techhelpmanual.com/894-at_keyboard_functions.html).                                                                 |
| INT 0aH                                                                                              | IRQ 2    | cascade，级联从片   | Connected to the secondary 8259a interrupt controller on ATs; may be used by EGA for vertical retrace. See EGA I/O Ports.                                                                                                                      |
| INT 0bH                                                                                              | IRQ 3    | COM 2/4，串口 2   | Interrupts when COM2 or COM4 has something to say. See Serial Ports.                                                                                                                                                                             |
| INT 0cH                                                                                              | IRQ 4    | COM 1/3，串口 1   | Interrupts when COM1 or COM3 has something to say. See Serial Ports.                                                                                                                                                                             |
| INT 0dH                                                                                              | IRQ 5    | LPT 2，并口 2    | AT: Interrupts when the printer on LPT2 is ready for another character (only if printer port 27aH is set up for this). See Printer Ports. PC/XT: This was used for the hard disk. See XT Hard Disk Ports.                                    |
| INT 0eH                                                                                              | IRQ 6    | diskette，软盘      | Interrupts after each action of the floppy diskette controller (read, write, seek, etc). See FDC Ports.                                                                                                                                           |
| INT 0fH                                                                                              | IRQ 7    | LPT 1，并口 1    | Interrupts when LPT1 is ready for another character (only when controller port 37aH is set up for this). See Printer Ports.                                                                                                                      |
| INT 70H                                                                                              | IRQ 8    | RT Clock，实时时钟 | Interrupts 1024 times per second (on AT-class or better computers). This is generated by the same hardware that handles the non-volatile data in the CMOS Memory.                                                                                 |
| INT 71H                                                                                              | IRQ 9    | redir IRQ2，级联到主片 | On AT-class computers, IRQ 2 is used as the connection to a secondary 8259a interrupt controller. Actual occurrences of IRQ 2 are redirected to IRQ 9. This IRQ may be generated by EGA/VGA. See EGA I/O Ports.                            |
| INT 72H                                                                                              | IRQ 10   | (reserved)       | There is no default device for this IRQ.                                                                                                                                                                                                         |
| INT 73H                                                                                              | IRQ 11   | (reserved)       | There is no default device for this IRQ.                                                                                                                                                                                                         |
| INT 74H                                                                                              | IRQ 12   | (reserved)       | There is no default device for this IRQ.                                                                                                                                                                                                         |
| INT 75H                                                                                              | IRQ 13   | math chip，协处理器   | The 80x87 math coprocessor generates this interrupt on exceptions (errors).                                                                                                                                                                              |
| INT 76H                                                                                              | IRQ 14   | hard disk，硬盘      | Interrupts when the hard disk controller finishes an operation. See AT Hard Disk Ports.                                                                                                                                                                 |
| INT 77H                                                                                              | IRQ 15   | (reserved)       | There is no default device for this IRQ.                                                                                                                                                                                                         |

在 `int 08h` 之前，就是级别更高的中断，比如除以零、NMI、单步调试等。所以课件上说，中断编号 0~7 的（不是 irq 0~7），不归 8259 管。

| 编号     | 描述                        |
| :------- | :-------------------------- |
| INT 00h  | (0)Divide by 0             |
| INT 01h  | (1)Single Step              |
| INT 02h  | (2)Non-Maskable Interrupt (NMI) |
| INT 03h  | (3)Breakpoint               |
| INT 04h  | (4)Overflow                  |
| INT 05h  | (5)Print Screen              |

顺带一提，**主 8259 占用地址 0x20~0x3f，从 8259 占用地址 0xa0~0xbf**。~~虽然不知道这个有啥用，但是可能需要记住~~。

## 中断

就是程序运行期间，被一些外部信号或特殊指令打断，从当前执行的程序，转为去执行 interrupt handler，也叫做 ISR（interrupt service routine）。执行完之后再回来。

8086 当中有三种类型的中断：

*   硬件中断，INTR 引脚接收到一个外部的信号引起，或者是处理器的 NMI 引脚引起
*   异常中断，比如遇到了除以零的情况
*   软件中断，即汇编代码当中的 `int` 指令，类似于调用了一个 BIOS 的函数

### 中断向量表

对于 8086：

*   中断向量表的地址是从 0000:0000 到 0000:03ff，换算成十进制一共是 1024 个字节，即内存中最前面的 1k 个字节
*   中断向量表当中的每一个 item 都是 4 字节：用两个字节描述 CS，另外两个字节描述 IP。合起来的 CS:IP 就是 ISR 的地址。因此，中断向量表最多存储 256 个中断。**IP 是低位，CS 是高位。**

8086 中断向量表的节选如下：

![中断向量表](https://s2.loli.net/2023/05/26/GeDv75FJmsnZNr3.png)

### CPU 处理中断的详细流程

1.  硬件如果想触发一个中断，就把 IRQx 弄成 low
2.  然后 8259A 通过 INTR 线，把信号传给 CPU
3.  CPU 作出响应（INTA，interrupt acknowledge 信号）
4.  8259A 看到 INTA 信号之后，把中断的编号（0~255）放到数据总线上
5.  CPU 读取中断的编号信息
6.  CPU 把当前的 CS:IP、SP、Flag 寄存器等内容保存到栈里
7.  CPU 根据编号，计算出 ISR 在中断向量表里的位置，更新 CS:IP 为 ISR 的。**计算方法是：中断编号乘以四。**
8.  然后 ISR 就开始执行了，遇到 IRET 则结束 ISR，把之前保存到栈的东西恢复
9.  回到刚刚执行的地方继续执行

**IRQ 编号较小的通常具有更高优先级**。因此可以产生如图所示的嵌套中断：

![嵌套中断](https://s2.loli.net/2023/05/26/GqyREupdJIfKZS9.png)

## 杂项

### 中断 flag

就是 flag 寄存器当中的一个位，表示是否响应中断。

若 IF=1，则表示处理器响应中断；若 IF=0，表示处理器屏蔽中断。

然而对于 NMI（不可屏蔽中断），不管 IF 取值如何，处理器都会相应。

`STI` 和 `CLI` 命令可以用于设置这个 flag 的值。

### 中断屏蔽（mask）

在 21h 和 a1h 的两个字节的 16 个 bit，可以分别表示，是否启用 0~15 共计 16 个中断。取值 1 表示禁用该中断，取值 0 表示不禁用。

```asm
; 屏蔽掉 0 号、3 号、7 号共计三个中断
mov al, 10001001b
mov dx, 021h
out dx, al
```

### ISR 的最后

ISR 结束之前，必须要有以下几行代码，告知控制器，哦，这个 ISR 要结束了！

```asm
; end_of_ISR:
    mov al, 020h
    mov dx, 020h
    out dx, al
```

### 自定义 ISR

像 IRQ0（int 08h），每隔 50ms 左右就会自动执行一次。如果我把 IRQ0 的 ISR 地址改成我自己的一个 ISR 的地址，那么就相当于，每隔 50ms 左右，我自己的那个玩意儿自动执行一次。

### TSR

TSR（Terminate and Stay Resident programs），说白了就是在后台运行的东西。比如 Lab5 第三题那玩意儿。

TSR 可以用于创建屏幕单词拼写检查器之类的东西。

但是，如果后台有一个 TSR 在运行，那么可能你进行一些其他的操作（尤其是 critical 的操作）的时候，可能就会出现一些奇奇怪怪的意想不到的问题。解决办法就是重启电脑，这样 TSR 就被自动关闭了。

Win95 采用了一个叫做事件管理器的东西来通知相应的程序。这比 8086 的 TSR 靠谱多了。
