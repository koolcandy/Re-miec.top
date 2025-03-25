# Lecture 10. 线程（25 页）

## 运行时的进程

回顾 PCB 的结构：

![PCB](https://s2.loli.net/2023/06/11/lTEX6ZBFAgGOWcs.png)

所以如果用 `fork()` 创建一个新的进程，整个 PCB 都会被复制一份，开销挺大的。

`malloc()` 会从堆空间当中找出一块空地分配给当前的结构，然后返回指针。`free()` 用于释放这些空间。

进程运行的上下文可以用一点信息表示：

*   CPU 里面的 Program Counter
*   CPU 里面的各类寄存器（包括 IP 和 SP 等，用于定位指令和栈）
*   运行时的栈

## 线程

![线程1](https://s2.loli.net/2023/06/11/VBIqRKcNrbphkwl.png)

![线程2](https://s2.loli.net/2023/06/11/3x4z21LFADQCOrt.png)

创建线程不像创建进程那样需要复制 PCB，而是直接共享进程的堆空间（不过每个线程的栈空间还是独立的），所以会快很多。此外，线程还可以作为 entity 被操作系统管理。

### 多线程的好处

*   多线程应用在多核处理器上可以有更好的性能
*   GUI 程序使用多线程可以获得更好的反馈体验
*   在 RPC 的场景中，对于服务器而言，使用多线程可以减少客户端的等待时间

## 多线程模型

*   用户线程（user thread）位于内核之上，它的管理无需内核支持，**编程语言层面** 实现，所以比较快；但是往内核切换的时候，会把进程中的其他线程都 **阻塞** 掉；而且，用户线程是 **不能多核** 运行的，进程中不同线程的调度也是 **不能抢占** 的
*   内核线程（kernel thread）由操作系统直接支持与管理，所以调度会慢一些，但是更灵活！比如，要执行系统调用的线程（切换到内核态）**不会阻塞** 掉别的线程，而且还 **可以使用多核** 的 CPU，而且还 **可以抢占**。

![多线程模型](https://s2.loli.net/2023/06/11/iMPVBgp9fhu2bNA.png)

## C 多线程的 C 语言实现

`pthread` 是 POSIX 的一个组件，可以用来实现 Windows/Linux 的多线程编程。

*   `pthread_create(id, attr, fun, argumentList)`，用于创建线程，`attr` 设为 NULL 表示默认
*   `pthread_exit()` 用于显式退出线程，但是并不销毁
*   `pthread_join()` 可以阻塞原始线程，直到子线程执行完毕
*   `pthread_detach()` 和 `pthread_join()` 都可以收集线程的信息

```c
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

void* fun(void* message) {
  printf("%s \n", (char*)message);
  return NULL;
}

void main() {
  pthread_t thread1, thread2;
  charge msg1[] = "Thread 1", msg2[] = "Thread 2";
  int iret1, iret2;
  iret1 = pthread_create(&thread1, NULL, &fun, msg1);
  iret2 = pthread_create(&thread2, NULL, &fun, msg2);
  pthread_join(thread1, NULL);
  pthread_join(thread2, NULL);
}
```

编译的时候需要加入命令 `-lpthread` 才行。
