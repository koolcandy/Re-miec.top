
Lecture 6\. 汇编语言 Part5：浮点与 8087
===============================


这一节就只是给出了一个浮点运算的汇编代码的例子，实验当中也有涉及过。


代码主要分两块，一块是浮点运算，另一块是打印输出。


对于浮点计算，就是注意一下一开始的初始化操作，以及检查运算是否发生错误（检查 status word，与上 `3fh`）。



```x86asm
    FINIT           ; Set FPU to default state
    FLDCW cntrl     ; Round even, Mask Interrupts
    FLD A          ; Push A onto FP stack
    FLD A          ; Push A onto FP stack
    FMUL ST, ST(1)  ; Multiply top two numbers on stack to ST
    FMUL ST, ST(1)  ; Multiply top two numbers on stack to ST
    nop             ; Now ST is A^3
    FLD B          ; Push B onto FP stack
    FSQRT           ; Square root number on stack
    nop             ; Now ST is sqrt(B), ST(1) is A^3
    FADD ST, ST(1)  ; Add up top two numbers on stack to ST
    FSTSW stat      ; Load FPU status into [stat]
    mov ax, stat    ; Copy [stat] into ax
    and al, 03Fh    ; Check all 6 status bits
    jnz pass        ; If any bit set then jump
    FSTP RESULT     ; Copy result from stack into RESULT

```

对于打印输出，就是利用寻址以及移位，分别获取 32 个 bit 的值，然后打印。注意，这个 32 bit 的值先打印高 16 位，再打印低 16 位。因此用到了两次 `mov bx, OFFSET RESULT`。


`RESULT` 的四个字节的地址关系是这样的（对应图中 HY）


![](https://s2.loli.net/2023/05/23/o6Pw7nd2AHmuaCD.png)



```x86asm
    mov bx, OFFSET RESULT
    inc bx
    inc bx          ; Get higher 16 bits of RESULT
    mov ax, [bx]
    mov bx, ax
    mov cx, 16
back:
    rol bx, 1
    jc set
    mov dl, '0'
    jmp over
set:
    mov dl, '1'
over:
    mov ah, 02h
    int 021h
    cmp cx, 16  ; print a space for view
    je space
    cmp cx, 8   ; print a space for view
    je space
    jmp nospace
space:
    mov ah, 02h
    mov dl, ' '
    int 021h
nospace:
    loop back
    mov bx, OFFSET RESULT
    mov ax, [bx]
    mov bx, ax
    mov cx, 16
back1:
    rol bx, 1
    jc set1
    mov dl, '0'
    jmp over1
set1:
    mov dl, '1'
over1:
    mov ah, 02h
    int 021h
    loop back1

```

