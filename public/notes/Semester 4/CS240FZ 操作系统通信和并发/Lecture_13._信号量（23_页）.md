# Lecture 13. 信号量（23 页）

## 原先互斥问题解决方案的缺陷

回顾一下之前面包店算法的代码实现。

所有线程在进入和退出 critical section 的时候，都需要执行特定的代码片段。这些代码片段的顺序不能错。而且，每个线程都要有这些。

这就意味着啊，程序员在编写每一个线程的代码的时候，需要手动的把这些代码片段加入到线程里面去。

那这就很笨拙（awkward）。比如万一哪一个线程的代码复制错了，那就麻烦了。

所以说如果有一个抽象的东西，那就好多了。

还有一点啊，如果是多处理器，之前的面包店算法，可能还会遇到缓存问题。

软件方面的做法比较笨拙，而硬件方面的方法，刚才说过了，不太公平，也就是不能保证 progress 和 bounded waiting 原则。还有一些乱七八糟的缺陷。比如说，如果低优先级的线程持有锁，把高优先级的线程给阻塞了，就有可能导致系统响应能力变差。

所以这里引入了信号量这种东西。

## 信号量 Semaphores

> 考试的时候要记得拼写！Semaphores!

信号量，是为了解决三个方面的问题

- 笨拙 unwieldy（软件）
- 不公平 fairness（硬件）
- 忙等 busywaiting（软硬件）

根据信号量的定义，信号量包含了一个整数变量。这个整数变量只能通过 `P` 和 `V` 两个操作访问（其实就是 `acquire()` 与 `release()`，只不过信号量的发明者 dijkstra 是荷兰人，所以用荷兰语缩写 PV）

当然，P 与 V 的操作必须是 indivisible 的。

下面是 P 与 V 操作的 C 语言描述与示意图

```c
void P(int s) { while (S <= 0) wait(); S -= 1; }
void V(int s) { S += 1; }
```

![image](https://s2.loli.net/2023/06/13/lGiUhbD4QsIfwoz.png)

信号量 S 可以有两种类型。一种是二进制类型的，用于控制互斥。还有一种是可以取值很大的，可以实现计数。也就是说，信号量可以分为 binary 和 counting 两种类型。

那么，如何保证 P 与 V 操作是 indivisible 的呢？有以下方法：

- 第一种方法是把 P 与 V 操作当作 critical section，让后使用面包店算法
- 第二种方法是操作系统把 P 与 V 操作封装到系统调用里面，并暂时性的屏蔽中断
- 使用 indivisible 的硬件指令，搞一个自旋锁（spinlock）（这俩操作代码都比较短，这样做的性能不差）

## 信号量的使用方式

```c
Semaphore mutex = 1; // bin 类型的互斥信号量，初始未上锁
P(mutex);
// critical section
V(mutex);
```

C 语言可以直接使用 POSIX API 里面的信号量：

```c
#include <pthread.h>

pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER; // 用宏进行初始化
int counter = 0;

int main() {
  pthread_mutex_lock(&mutex1);
  ++counter;
  pthread_mutex_unlock(&mutex1);
}
```

## PV 操作的改进

由于刚才版本的 P 操作还是有可能导致忙碌等待的，所以可以改进一下，变成这样：

```c
void P(int s) {
  s -= 1;
  if (s < 0) {
    // add this thread into the waiting queue
    // block;
  }
}
void V(int s) {
  s += 1;
  if (value <= 0) {
    // remove a thread T from the waiting queue
    wakeup(T);
  }
}
```

当然，这时候的 P 和 V 操作也必须满足 indivisible。满足 indivisible 的方法上面提过了。

## 信号量的应用

- 有界缓冲问题（生产者消费者）
- 哲学家就餐问题
- 读者作者问题

将在后面课程当中研究
