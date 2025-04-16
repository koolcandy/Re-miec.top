
Lecture 4\. 汇编语言 Part3：算术、逻辑、位、转移指令
===================================


汇编指令可以分很多种类。有二进制算术指令、十进制算术指令、逻辑指令、数据传输指令、栈指令、控制传输指令、字符串指令、指针指令、IO 指令、前缀指令、系统指令、浮点指令…


注意：在这份笔记表格的「示例」列中，为了简洁，有些操作数用 A/B/X 等来表示，也有的用含义来表示。但是这并不准确，应当说明是寄存器、内存还是立即数等。更精确的表示还要带上位数等信息。


可以参考 [斯坦福大学的手册](https://www.scs.stanford.edu/05au-cs240c/lab/i386/c17.htm)，内含 80836 指令集详情。然而这门课学的主要是 8086，它们之间存在一定差异。（80836 是 1985 年的，8086 是 1978 的，80836 更强大）


二进制算术指令
-------




| 指令 | 示例 | 含义 | 备注 |
| --- | --- | --- | --- |
| `add` | `add A, B` | 整数加法 |  |
| `adc` | `adc A, B` | 带进位的整数加法，即 `add A, B+CF` |  |
| `sub` | `sub A, B` | 减法 |  |
| `cmp` | `cmp A, B` | 计算 A\-B 的值，结果反映给标志寄存器 | 不修改 A |
| `inc` | `inc A` | 加一 | 不影响 CF |
| `dec` | `dec A` | 减一 | 不影响 CF |
| `div` | `div X` | 无符号除法 | 有坑，见下文 |
| `idiv` | `idiv X` | 有符号除法 | 有坑，见下文 |
| `mul` | `mul X` | 无符号乘法 | 有坑，见下文 |
| `imul` | `imul X` | 有符号乘法 | 有坑，见下文 |


### `DIV` 与 `IDIV` 的坑


这两条指令的操作数只有除数，而被除数是隐含的，由除数的类型决定。


特别注意，当除数是字（16）字节的时候，被除数是 32 位的 `DX:AX`。也就是说，如果 `DX` 没有赋零，使用字作为除数，可能会导致意想不到的错误。因此，**进行字的除法前，一定要把 `DX` 清零**。




| 规模 | Dividend 被除数 | Divisor 除数 | Quotient 商 | Remainder 余数 |
| --- | --- | --- | --- | --- |
| byte | AX | r/m8 | AL | AH |
| **word** | **DX:AX** | **r/m16** | **AX** | **DX** |
| dword | EDX:EAX | r/m32 | EAX | EDX |


### `MUL` 与 `IMUL` 的坑


像刚刚一样，被乘数是隐含的，由乘数的类型决定。


特别注意，两个 16 位相乘，产生运算结果是 32 位的。低 16 位保存在 `AX` 里面，高 16 位溢出到 `DX` 里面。因此，**执行字的乘法，可能会污染 `DX` 寄存器**！




| 规模 | 被乘数 | 乘数 | 积 |
| --- | --- | --- | --- |
| byte | AL | r/m8 | AX |
| **word** | **AX** | **r/m16** | **DX:AX** |
| dword | EAX | r/m32 | EDX:EAX |


`IMUL` 指令比较特殊，它可以拥有两个操作数或者三个操作数。不过这比较复杂，就不研究了。


十进制算术指令
-------



> 课件上说这些东西了解即可


分析这些指令，一定要记得：AL AH 是 8 字节的，而最小分析单位（nibble）是四字节的。不要把 AL AH 跟 nibble 弄混。




| 指令 | 时钟周期 | 示例 | 含义 | 备注 |
| --- | --- | --- | --- | --- |
| `AAA` | 4 | `AAA` | 加法后调整 |  |
| `AAD` | 19 | `AAD` | 除法**前**调整 |  |
| `AAM` | 17 | `AAM` | 乘法后调整 |  |
| `AAS` | 4 | `AAS` | 减法后调整 |  |
| `DAA` | 4 | `DAA` | 加法后调整 |  |
| `DAS` | 4 | `DAS` | 减法后调整 |  |


### 分析：AAA（ASCII Adjust for Addition）


众所周知，字符表示的数字，ASCII 值比数字大 0x30。


#### 例一


如，'5' 的 ASCII 是 53，'9' 的 ASCII 是 57。设 AL 是 53（0011 0101），BL 是 57（0011 1001），执行：



```x86asm
add al, bl

```

此时 AL 就会变成 110，即 **0110 1110**。两个 0x30 合在一起，组成了高四位的 0110。若只看低四位，1110，等于 14，恰好就是 5\+9 的值。


再执行：



```x86asm
aaa

```

此时的 AL 就会变成 **0000 0100**（清零高四位；若低四位的值在 10\~15 之间或 AF 已经为 1，就把低四位加上 6，AF 与 CF 位设 1，AH 自增）。按照 BCD 的解码规则来分析现在的 AL，就是 0 4。由于进位标志被设置了，所以高位其实是 1，即表示 14。


加上 6 是因为，十六进制逢十六进一，而十进制是逢十进一，而四位二进制相当于十六进制，因此值少了 6。所以加上 6 结果就对了。避开 A\~F 共计 6 个无效数。


#### 例二



```x86asm
mov al, '5'
add al, '7'  ; 此时 al 是 0110 1100 = 110，不能直接当作 BCD，需要调整
aaa          ; 清零高四位，低四位在 A~F 之间
             ; 于是低四位加上 6，AL 变成 0010
             ; 并 AH+=1，AF=CF=1，AL = 0000 0010，BCD 解析为 0 2
             ; 算上进位，即表示 12 = 5+7

```

### 分析：AAS（Ascii Adjust for Subtraction）


与 aaa 几乎一样。区别是：


* aaa 低四位 A\~F 之间则加上 6，aas 是减去 6
* aaa 低四位 A\~F 之间则让 ah 加上 1，aas 让 ah 减去 1。


### 分析：AAD（Ascii Adjust for Division）


这是六条指令当中，唯一一个要在运算指令 **之前** 执行的指令。


用于除法运算之前，把未打包的 BCD 码调整为打包的 BCD。



```x86asm
mov ax, 0703h  ; 未压缩的 BCD，ah = 07h, al = 03h，表示十进制 73
mov bl, 02h    ; 除数
aad            ; BCD 调整为二进制，al = 70+3 = 73 = 49h, ah = 0
div bl         ; 由于操作单位是字节，al 保存商（al=24h)，ah 保存余数（ah=1）

```

由于 al 和 ah 都是 8421 码，最大是 9，所以调整后，最大是 99，在 127 范围内，不会爆。


### 分析：AAM（Ascii Adjust for Multiplication）


两个未打包的 BCD 相乘（$\[0, 9]$ 范围内），结果必定在 $\[0, 81]$ 范围内。使用 AAM 调整后，AH\=AL/10，存储十进制的十位数，AL\=AL%10，存储个位数。


AAM 只能在两个未打包的 BCD 相乘后执行。



```x86asm
mov al, 07h  ; AL = 07h
mov bl, 09h  ; BL = 09h
mul bl       ; AX = 003fh = 63 = 7*9
aam          ; AH = 6，AL = 3

```

### 应用：输出一百以内的整数


刚才提到过，字符表示的数字，ASCII 值比数字大 0x30。因此：


* 想要把 **半个字节** 的未压缩 BCD 转换成一个对应的字符，只需要 **或上 0x30**
* 想要把 **一个字节** 的压缩 BCD 转换成两个对应的字符，只需要 **或上 0x3030**。



```x86asm
mov al, 5
mov bh, 9
mul bh        ; AX = 45
aam           ; AH = 4, AL = 5

or ax, 3030h  ; 转化成字符

mov dl, ah    ; dl 是 21h 的参数，先输出高位
mov dh, al    ; 由于 al 的值会随时改变，先备份到 dh 里面
mov ah, 02h   ; 设置 21h 中断到输出 dl 的模式
int 21h       ; 输出高位：4
mov dl, dh    ; 把 dl 的值赋成刚刚备份的低位
int 21h       ; 输出低位：5

```

逻辑指令
----




| 指令 | 示例 | 含义 | 备注 |
| --- | --- | --- | --- |
| `AND` | `AND A, B` | 按位与 | 可以用来掩码（mask） |
| `OR` | `OR A, B` | 按位或 | 常用于 BCD 转 ASCII |
| `XOR` | `XOR A, B` | 异或 |  |
| `BT` | `BT Base, Offset` | 指定地址的值赋给 CF |  |
| `BTC` | `BTC Base, Offset` | 指定地址位的值赋给 CF，该位取反 |  |
| `BTR` | `BTR Base, Offset` | 指定地址位的值赋给 CF，该位设零 |  |
| `BTS` | `BTS Base, Offset` | 指定地址位的值赋给 CF，该位设一 |  |
| `BSF` | `BSF A, B` | B 最低的 1 是第几位，赋给 A | 影响 ZF |
| `BSR` | `BSR A, B` | B 最高的 1 是第几位，赋给 A | 影响 ZF |


**注意：课件里关于 BSF 和 BSR 的描述好像错了。跟网络资源很不一样。而且，这俩好像是 80386 而不是 8086 的。**


移位指令
----




| 指令 | 示例 | 含义 | 备注 |
| --- | --- | --- | --- |
| `SHL` | `SHL r/m, 1/CL` | 首位给 CF，尾位置零 |  |
| `SHR` | `SHR r/m, 1/CL` | 尾位给 CF，首位置零 |  |
| `SAL` | `SAL r/m, 1/CL` | 算术，首位给 CF，尾位维持不变 |  |
| `SAR` | `SAR r/m, 1/CL` | 算术，尾位给 CF，首位维持不变 |  |
| `ROL` | `ROL r/m, 1/CL` | 循环左移，最高位同时给 CF 和最低位（w） |  |
| `ROR` | `ROR r/m, 1/CL` | 循环右移，最低位同时给 CF 和最高位（w） |  |
| `RCL` | `RCL r/m, 1/CL` | 循环左移，把 CF 视作额外最高位（w\+1） |  |
| `RCR` | `RCR r/m, 1/CL` | 循环右移，把 CF 视作额外最高位（w\+1） |  |
| `SHLD` | `SHLD A, B, cnt` | 双精度左移，缺位由 B 的高位填充，B 不变 |  |
| `SHRD` | `SHRD A, B, cnt` | 双精度右移，缺位由 B 的低位填充，B 不变 |  |


`SHLD` 和 `SHRD` 好像 8086 不支持。


其他几个移位指令的操作数，好像只能是 1，或者寄存器 `CL`。到 80836 上可以是立即数。


![](https://s2.loli.net/2023/04/10/P6E3pJzTG2QUuZ8.png)


标志位指令
-----




| 指令 | 示例 | 含义 | 备注 |
| --- | --- | --- | --- |
| `CLC` | `CLC` | 进位标志置零 |  |
| `STC` | `STC` | 进位标志设一 |  |
| `CMC` | `CMC` | 进位标志取反 |  |
| `CLD` | `CLD` | 方向标志置零 |  |
| `STD` | `STD` | 方向标志设一 |  |
| `CLI` | `CLI` | IF 置零，关闭中断 |  |
| `STI` | `STI` | IF 设一，打开中断 |  |


分支控制转移
------


指令指针（IP）可以视作当前执行第几行代码，执行指令后自动递增。


对于分支指令，就修改 IP；而对于调用指令，相当于把当前 IP 压入栈中，然后再修改 IP，然后再弹栈。


汇编代码中，**一个字符串后面跟上冒号，表示一个标签（label）**。比如：`haha:` 就是一个标签。标签可以清晰的表示代码片段结构和作用，转移指令当中也可以指定跳转到哪一个标签。


### 条件跳转 conditional jump


条件转移指令通常都是接在 `cmp` 指令之后。所有的 J 都是「Jump if」的意思，后面的字母代表条件的英文首字母缩写。


条件转移的操作数是单字节的，所以 **不能跳太远**，范围是向前 128 到向后 127（\-128\~127）。




| 指令 | 含义 | flag | 反指令 | 反含义 | 反 flag |
| --- | --- | --- | --- | --- | --- |
| `JA` | Above | `ZF=0 and CF=0` | `JNA` | Not Above | `ZF=1 or CF=1` |
| `JAE` | Above or Equal | `CF=0` | `JNAE` | Not Above or Equal | `CF=1` |
| `JB` | Below | `CF=1` | `JNB` | Not Below | `CF=0` |
| `JBE` | Below or Equal | `ZF=1 or CF=1` | `JNBE` | Not Below or Equal | `ZF=0 and CF=0` |
| `JC` | **Carry** | `CF=1` | `JNC` | **Not Carry** | `CF=0` |
| `JCXZ` | CX is Zero | `CX=0` | \- | \- | \- |
| `JE` | Equal | `ZF=1` | `JNE` | Not Equal | `ZF=0` |
| `JG` | Greater | `ZF=0 and SF=OF` | `JNG` | Not Greater | `ZF=1 or SF!=OF` |
| `JGE` | Greater or Equal | `SF = OF` | `JNGE` | Not Greater or Equal | `SF != OF` |
| `JL` | Less | `SF != OF` | `JNL` | Not Less | `SF = OF` |
| `JLE` | Less or Equal | `ZF=1 or SF!=OF` | `JNLE` | Not Less or Equal | `ZF=0 and SF=OF` |
| `JO` | Overflow | `OF=1` | `JNO` | No Overflow | `OF=0` |
| `JP` | Parity | `PF=1` | `JNP` | Not Parity | `PF=0` |
| `JPE` | Parity is Even | `PF=1` | `JPO` | Parity is Odd | `PF=0` |
| `JS` | Signed | `SF=1` | `JNS` | Not Signed | `SF=0` |
| `JZ` | **Zero** | `ZF=1` | `JNZ` | **Not Zero** | `ZF=0` |


其中：


* `JA`，`JB` 系列比较的是无符号数，`JG`，`JL` 系列比较的是有符号数
* 如果不支持 `JB` 和 `JNB`，可以用 `JC` 表示 `A < B`，用 `JNC` 表示 `A <= B`，这些其实是等价的
* `JG`，`JL` 系列的 flag 要求不是很好理解。课件上 `JG` 的条件是 `ZF=0 and SF=0`，`JGE` 的条件是 `SF=0`，`JL` 和 `JLE` 的条件明显写错了。


#### 可移植性


汇编语言不像 C，Java 那样具有可移植性。因为，许多微处理器，只有基于 C 和 Z 的 jump。


这门课学习的汇编是 x86 的一个子集。


### 无条件跳转 unconditional jump


`JMP` 指令，啥都不管，直接跳过去。可以跳的远一些（范围 \-32768\~32767），甚至可以把目标地址存进寄存器再跳到寄存器去（`jmp ax`）。


### 循环


主要有三种：


* `LOOP`，相当于 `do {} while ((cx!=0) && (--cx||true));`
* `LOOPZ`，相当于 `do {} while ((cx!=0 && ZF=1) && (--cx||true));`
* `LOOPNZ`，相当于 `do {} while ((cx!=0 && ZF=0) && (--cx||true));`


时钟周期与延迟计算
---------


![](https://s2.loli.net/2023/04/07/fK1mDOFibqNtYAW.png)
![](https://s2.loli.net/2023/04/07/FU1bChBasN5du96.png)


### 短延迟（一层循环）


对于如下程序



```x86asm
    mov cx, N  ; 消耗 4 时钟周期，这里 N 是字面量，但是取值还未确定
tag:
    nop        ; 消耗 3 时钟周期
    nop        ; 消耗 3 时钟周期
    loop tag   ; 消耗 17 个时钟周期，退出循环时仅 5 个时钟周期

```

那么，循环体总共消耗 3\+3\+17 \= 23 个时钟周期。


这个程序总周期消耗是：$C\_T \= 4 \+ 23 \\cdot N \- 12$。


假设现在有一台机器，时钟频率是 100MHz（每个时钟周期 $10^{\-8}$ 秒），想让他睡 25 微秒（$2\.5 \\times 10^{\-5}$ 秒），该如何取 $N$ 的值？


首先容易计算：25 微秒是 2500 个时钟周期。也就是说需要计算：$N$ 取什么值，可以让时钟周期数 $C\_T \= 2500$？


刚才那个式子移项可以得到：$$N \= \\frac{C\_T \- 4 \+ 12}{23} \= 109$$，即需要 `mov cx, 109`，睡 25 微秒。


### 长延迟（两层甚至更多层循环）


考虑如下程序



```x86asm
    mov bx, 30000  ; 4 个周期
lp1:               ; 外层循环开始
    mov cx, 30000  ; 4 个周期
lp2:               ; 内层循环开始
    nop            ; 3 个周期
    loop lp2       ; 17/5 个周期；内层循环结束
    dec bx         ; 2 个周期；cx 被占用，这里只能用 dec 配合 jnz 了
    jnz lp1        ; 16/4 个周期；外层循环结束

```

对于内层循环，$C\_I \= 4 \+ 30000 \\times 20 \- 12 \= 599992$。


对于总循环，$C\_T \= 4 \+ 30000 \\times (599992 \+ 2 \+ 16\) \- 12 \= 1\.8 \\times 10^{10}$。


有一台实验机，标 300MHz，跑了 15s。


然而，跑 15s 说明频率高达 1\.2GHz，与标注的 300MHz 不符。这说明，这台机器每秒执行四条指令。这个现象可能是由于多核。


打印数字
----


### 方案一：取模


在「十进制算术指令」一节当中，提到了输出 100 以内整数的方法。这里再补充一个输出 16 位无符号整数即 $\[0, 65535]$ 范围内整数的方法。


这种方法的缺陷是，如果不到 10000，打印出来会带前导零。


![](https://s2.loli.net/2023/04/07/d1MiqmDvXeSacP8.png)


#### 代码实现一：用减法实现取模（源自课件）



```x86asm
.MODEL medium
.STACK
.DATA
.CODE
.STARTUP
    mov ax, 12345
    call Print     ; 调用 Print 过程，打印 ax
.EXIT


Print:
    push bx        ; 过程开始，把所有的寄存器都存栈备份
    push cx
    push dx
    mov dx, 10000
    mov cx, 5
NXTCH:
    push cx
    push ax
    push dx

    ; save (num / pw10) into stack
    mov cx, dx     ; 此时 cx 就是 pw10
    mov dx, 0h
    div cx         ; ax /= pw10
    push ax        ; 存栈 (num / pw10)

    ; 求出 num 该减去多少
    mov bl, al     ; bl 存首位
    mov bh, 0h
    mov dx, 0h
    mov ax, cx     ; cx 此时还是 pw10
    mul bx         ; 让 ax 变成 x0000 的形式
    mov bx, ax     ; 把 ax 赋给 bx，此时 bx 就是该减去多少

    ; pop (num / pw10) into dx, putchar(dx)
    pop dx         ; 此时 dx 是刚刚的 ax（对应 Line26）
    or dl,  30h    ; 转 ASCII
    mov ah, 02h
    int 021h

    ; pw10 /= 10
    pop ax         ; 此时 ax 是 NXTCH 开始时的 dx，即 pw10（对应 Line20）
    mov dx, 0h
    mov cx, 10
    div cx
    mov dx, ax     ; 现在 dx 保存了新的 pw10，可以给下一轮循环用

    ; 用减法实现 ax %= old_pw10
    pop ax         ; 此时 ax 就是一开始的 num（对应 Line19）
    sub ax, bx     ; 删掉 ax 的最高位
    pop cx         ; 此时 cx 就是一开始的 cx（对应 Line18），即恢复原值，循环变量值不能乱
    loop NXTCH     ; 循环

    pop dx         ; 过程结束，恢复栈当中的备份
    pop cx
    pop bx
    ret


END

```

#### 代码实现二：从寄存器中直接提取余数（源自期中考试）



```x86asm
    .MODEL medium
    .STACK
    .DATA
count   byte    5
ten     word    10
    .CODE
    .STARTUP
    mov ax, 12345
    call Print
    .EXIT
Print:
    push bx        ; 存栈
    push cx
    push dx
    mov bx, 10000
again:
    mov dx, 0h     ; 除法前清空 dx
    div bx         ; dx:ax /= bx
    or al, 030h    ; 数字转 ASCII
    push dx        ; 保存余数
    mov dl, al     ; 传参给 21h 中断
    mov ah, 02h    ; 输出字符模式
    int 021h
    mov dx, 0h     ; 除法前清空 dx
    mov ax, bx     ; bx /= 10
    div ten
    mov bx, ax
    pop ax
    dec count
    jnz again
    pop dx         ; 恢复
    pop cx
    pop bx
    ret            ; 必须记得返回，否则会出问题
    END

```

### 方案二：使用栈


![](https://s2.loli.net/2023/04/07/OC6KXVRNjalk5bU.png)


#### 代码实现一：带前导零（根据课件伪代码）



```x86asm
    .MODEL medium
    .STACK
    .DATA
ten word 10
    .CODE
    .STARTUP
    mov ax, 0
    call Print
    .EXIT
Print:
    push bx
    push cx
    push dx
    mov cx, 5
again:
    mov dx, 0
    div ten
    push dx
    loop again
    mov cx, 5
again2:
    pop dx
    or dx, 30h
    mov ah, 02h
    int 021h
    loop again2
    pop dx
    pop cx
    pop bx
    ret
    END

```

#### 代码实现二：不带前导零（修改一下）


弹栈的时候特判一下，就不带前导零了。


但是也要特判，如果要输出的本来就是零，怎么办。



```x86asm
    .MODEL medium
    .STACK
    .DATA
ten word 10
    .CODE
    .STARTUP
    mov ax, 2345
    call Print
    .EXIT
Print:
    push bx
    push cx
    push dx
    cmp ax, 0
    jz iszero    ; 特判，如果要输出的是零
    mov cx, 5
again:
    mov dx, 0
    div ten
    push dx
    loop again
    mov cx, 5
again2:
    pop dx
    cmp dx, 0
    je ignore    ; 忽略前导零
    or dx, 30h
    mov ah, 02h
    int 021h
ignore:
    loop again2
    jmp notzero
iszero:
    mov ah, 02h
    mov dl, '0'
    int 021h
notzero:
    pop dx
    pop cx
    pop bx
    ret
    END

```

