
Lecture 3\. 汇编语言 Part2：寻址模式与指令格式
================================


寻址模式
----


许多汇编指令都需要 *运算数（operand）*。这个运算数可能以字面量的形式体现在代码中，也在一个寄存器当中，也可能是在由地址字面量指定的位置，或者是表示指针的寄存器指向的位置。CPU 去寻找这个数据的方式叫做 *寻址模式（addressing mode）*。


寻址模式有七种，前四种最为重要。


### ※立即寻址，Immediate addressing


运算数以 **字面量** 形式写在指令里面，如 `mov ax, 10`，这里的运算数也称作 *立即数*。


### ※寄存器寻址，Register Addressing


指运算数保存在某个通用寄存器当中，如 `mov ax, bx`。


寄存器的访问是在 CPU 内部的，非常非常快，不需要寻址。


### ※直接寻址，Direct Addressing


比如 `mov ax, Count`，就把 data 段当中的变量 `Count` 作为操作数。


实际上，变量 `Count` 在汇编器的眼里，只不过是对应数据所在的地址罢了。所以相当于把 `Count` 所在地址的值赋给 `ax`


如果要指定其他的段，可以写作 `mov ax, ES:Count`，即表示在额外段上的内容。


### ※寄存器间接寻址，Register Indirect Addressing


相对于直接寻址（把偏移地址直接以字面量的形式写在指令当中），寄存器间接寻址是 **把偏移地址存在寄存器（通常是索引寄存器 BX，BP，SI 或 DI）当中**。如果是 BP，那对应的段就是栈段，否则就是数据段。


这种寻址方式的写法，跟高级语言当中的数组比较类似：


* `mov ax, [bx]` 表示 `ax = array[bx]`
* `mov [bx], ax` 表示 `array[bx] = ax`


### 寄存器相对寻址，Register Indirect with Displacement


课件当中没有提到


### 基址加变址寻址，Register Indirect with base and register


类似于寄存器间接寻址，地址是基址寄存器（BX、BP）与变址寄存器（SI、DI）的直接求和。


如 `mov ax, [bx][SI]`，相当于高级语言当中的 `ax = array[bx + SI]`


### 相对基址加变址寻址，Register Indirect with base and index and constant


相对于上面使用两个寄存器的基址加变址寻址，这种寻址不仅使用两个寄存器，还使用一个常量（字面量）。


如 `mov ax, Count[bx][SI]` 相当于高级语言的 `ax = array[Count + bx + SI]`


指令格式
----


8086 上的指令，至少有两个字节（16 位）。最高的六位表示 opcode，接下来十位表示 D，W，MOD，REG，R/M 信息。


![](https://s2.loli.net/2023/03/31/voQNlSZybi2Fw61.png)


* OPCODE，表示哪一条指令
* D，表示方向（direction），是 from 寄存器（D\=0），还是 to 寄存器（D\=1）
* W，表示操作的是字（D\=0）还是字节（D\=1），一个 *字（word）* 是两个字节
* Reg，三位数据，表示哪一个寄存器
* MOD，是 mode 缩写，表示寻址模式
* R/M，也与寻址模式相关，是寄存器还是内存


### 寄存器编号


![](https://s2.loli.net/2023/04/06/oshgKL6aU9YIAEW.png)


### 寻址模式


由 MOD 和 R/M 配合指定。其中 MOD 指定寻址模式或 offset 信息，R/M 表示寄存器。


MOD 取值：


* 00：立即寻址 或 寄存器间接寻址 或 基址加变址寻址
* 01：相对基址加变址寻址，八位
* 10：相对基址加变址寻址，十六位
* 11：寄存器寻址模式


![](https://s2.loli.net/2023/04/06/KaHRozW7981wbqd.png)


### 示例


`mov SP, BX` 的二进制指令是：




| opcode | D | W | Mod | Reg | R/M |
| --- | --- | --- | --- | --- | --- |
| 100010 | 1 | 1 | 11 | 100 | 011 |
| `mov` | to 寄存器 | 字 | 寄存器寻址模式 | 到 SP 寄存器 | 从 BX 寄存器 |


ASCII 码表
--------


### 控制字符（0\~31）


不可打印，用于控制打印机等外围设备




| DEC | HEX | Symbol | Description |
| --- | --- | --- | --- |
| 0 | 0 | NUL | Null character |
| 1 | 1 | SOH | Start of Heading |
| 2 | 2 | STX | Start of Text |
| 3 | 3 | ETX | End of Text |
| 4 | 4 | EOT | End of Transmission |
| 5 | 5 | ENQ | Enquiry |
| 6 | 6 | ACK | Acknowledge |
| 7 | 7 | BEL | Bell, Alert |
| 8 | 8 | BS | Backspace |
| **9** | **9** | **HT** | **水平制表，Horizontal Tab** |
| **10** | **0A** | **LF** | **换行，Line Feed** |
| 11 | 0B | VT | Vertical Tabulation |
| 12 | 0C | FF | Form Feed |
| **13** | **0D** | **CR** | **回车，Carriage Return** |
| 14 | 0E | SO | Shift Out |
| 15 | 0F | SI | Shift In |
| 16 | 10 | DLE | Data Link Escape |
| 17 | 11 | DC1 | Device Control One (XON) |
| 18 | 12 | DC2 | Device Control Two |
| 19 | 13 | DC3 | Device Control Three (XOFF) |
| 20 | 14 | DC4 | Device Control Four |
| 21 | 15 | NAK | Negative Acknowledge |
| 22 | 16 | SYN | Synchronous Idle |
| 23 | 17 | ETB | End of Transmission Block |
| 24 | 18 | CAN | Cancel |
| 25 | 19 | EM | End of medium |
| 26 | 1A | SUB | Substitute |
| **27** | **1B** | **ESC** | **退出，ESC，Escape** |
| 28 | 1C | FS | File Separator |
| 29 | 1D | GS | Group Separator |
| 30 | 1E | RS | Record Separator |
| 31 | 1F | US | Unit Separator |


### 通用可打印字符（32\~127）


对于各种 ASCII 码表的变体，32\~127 这个范围内的可打印字符都是通用的。表中省略了阿拉伯数字和大小写字母。




| DEC | HEX | Symbol | Description |
| --- | --- | --- | --- |
| 32 | 20 | SP | 空格，Space |
| 33 | 21 | ! | 感叹号，Exclamation mark |
| 34 | 22 | " | 双引号，Double quotes (or speech marks) |
| 35 | 23 | \# | 井号，Number sign |
| 36 | 24 | $ | 美元符号，Dollar |
| 37 | 25 | % | 百分号，Per cent sign |
| 38 | 26 | \& | 与符号，Ampersand |
| 39 | 27 | ' | 单引号，Single quote |
| 40 | 28 | ( | 左括号，Open parenthesis (or open bracket) |
| 41 | 29 | ) | 右括号，Close parenthesis (or close bracket) |
| 42 | 2A | \* | 星号，Asterisk |
| 43 | 2B | \+ | 加号，Plus |
| 44 | 2C | , | 逗号，Comma |
| 45 | 2D | \- | 横线（减号），Hyphen\-minus |
| 46 | 2E | . | 点，Period, dot or full stop |
| 47 | 2F | / | 斜杠，Slash or divide |
| 58 | 3A | : | 冒号，Colon |
| 59 | 3B | ; | 分号，Semicolon |
| 60 | 3C | \< | 小于，Less than (or open angled bracket) |
| 61 | 3D | \= | 等于，Equals |
| 62 | 3E | \> | 大于，Greater than (or close angled bracket) |
| 63 | 3F | ? | 问号，Question mark |
| 64 | 40 | @ | at 符号，At sign |
| 91 | 5B | \[ | 左方括号，Opening bracket |
| 92 | 5C | \\ | 反斜杠，Backslash |
| 93 | 5D | ] | 右方括号，Closing bracket |
| 94 | 5E | ^ | 幂号，Caret \- circumflex |
| 95 | 5F | \_ | 下划线，Underscore |
| 96 | 60 | \` | 重音号，Grave accent |
| 123 | 7B | { | 左花括号，Opening brace |
| 124 | 7C | \| | 竖线，Vertical bar |
| 125 | 7D | } | 右花括号，Closing brace |
| 126 | 7E | \~ | 波浪线，Equivalency sign \- tilde |
| 127 | 7F | DEL | 删除，Delete |


### 重要字符


* *回车（Carriage Return，CR）*，是 13，编程语言用 `\r` 表示，表示回到行首
* *换行（Line Feed，LF）*，是 10，编程语言用 `\n` 表示
* *退出（Escape，ESC）*，是 27，被用于许多输出设备，标志着开始一个转义字符序列。几十年前 ESC 键用来做这个事情，但是现在基本没有了。


汇编指示符
-----


![](https://s2.loli.net/2023/04/06/YwF2ESAOg5ZjaqM.png)


