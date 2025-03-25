# Lecture 15.16 哲学家就餐以及读者作者问题（42 页）

## 哲学家就餐问题（Lab8）

有 5 个哲学家，生活除了思考和吃饭，没有别的事情。他们公用一个圆桌。这个圆桌上摆着 5 个饭碗和 5 根筷子（不是 5 双！）。

![Philosopher's Dinner](https://s2.loli.net/2023/06/13/JV3DikdFxwRsL6H.png)

于是如果一个哲学家饿了想要吃饭，就必须拥有两根筷子。然而由于手短，哲学家只能拿到自己左边和右边的筷子。但是这个筷子可能会被邻座的哲学家拿走。也就是说，这些筷子，是有互斥关系的。

### 最简单的解决方案（可能死锁）

用一个二进制信号量数组表示 5 根筷子是否可以使用：

```java
Semaphore chop[] = new Semaphore[5];
for (int i = 0; i < 5; ++i) chop[i] = new Semaphore(1);
```

对于每个哲学家，只要不是在思考，就是在吃饭。第 $i$ 和 $i+1$ 根筷子，分别位于第 $i$ 个哲学家的左右手两侧。

```java
while (alive) {
  chop[i].acquire();
  chop[(i + 1) % 5].acquire();
  eat();
  chop[i].release();
  chop[(i + 1) % 5].release();
  think();
}
```

但是这种做法可能就会出现，五个哲学家，同时要吃饭。于是五个筷子都被拿起来了。所有人都在等着拿第二根筷子，但是又没有空余的筷子。于是死锁了。

![Deadlock](https://s2.loli.net/2023/06/13/P1DU8KWdIaRZQsV.png)

### 避免死锁的第一种方法：限制餐桌人数

允许最多四个哲学家坐上餐桌。换句话说，餐厅里最多只能有四个人，有一个人要在门外呆着。这意味着至少有一个哲学家可以拿到两根筷子。于是这个幸运的哲学家就可以先吃。

所以，新增一个名叫 `room` 的信号量，初始值是 $4$ 就可以了。每个哲学家在申请筷子之前，先要执行 `room.acquire()`。

### 避免死锁的第二种方法：等有了俩筷子再吃

不用筷子信号量数组了，直接用筷子布尔数组表示有没有被使用（然后引入一个二进制信号量 `mutex` 确保不会被多个哲学家线程同时访问）。当左右两边的筷子都可用的时候才拿筷子吃饭，否则就等等。

```java
boolean chop[] = new boolean[5];
boolean canEat = false;
Semaphore mutex = Semaphore(1);
while (!canEat) {
  mutex.acquire();
  if (chop[i] && chop[(i + 1) % 5]) {
    chop[i] = chop[(i + 1) % 5] = false;
    canEat = true;
  }
  mutex.release();
}
```

但是这种方法会导致忙等。

以及在实际中，可能线程对资源的需求不仅仅是俩筷子，可能是一百个筷子。要等一百个筷子都 valid，很难。

### 避免死锁的第三种方法：Adhoc

对于这个问题，有一个 adhoc 的方法就是，让编号奇数的哲学家先拿左边再拿右边，编号偶数的哲学家先拿右边再拿左边的筷子。

于是，如果一个人拿走了右边的筷子，那他右边的人由于想要拿左边的筷子就会拿不到。这就巧妙地避免了死锁。

```java
if (id % 2 == 0) {
  chop[i].acquire();
  chop[(i + 1) % 5].acquire();
} else {
  chop[(i + 1) % 5].acquire();
  chop[i].acquire();
}
chop[i].release();
chop[(i + 1) % 5].release();
```

### 上述方案的缺陷

没有保证不会发生 *饥饿（starvation）*。也就是说，可能会有一个不幸的哲学家，永远吃不上饭。

## 读者作者问题（Lab9）

课上放了一个视频，与 reader writer 问题有关：[https://www.youtube.com/watch?v=J60NK9F-c7A](https://www.youtube.com/watch?v=J60NK9F-c7A)

有一个数据库。有人往数据库里面写东西，有人从数据库里面读取东西。读取的话可以多个人一起读，但是写入必须单独进行，要不然可能就乱大套了。

有多种解决这个的方案，主要是第一读者作者问题和第二读者作者问题。

*   first rw problem：重视读者的利益，除非作者已经开始写东西了，读者不用等直接就可以读
*   second rw problem：重视作者的利益，只要作者想要写东西，就尽早写，写完之前不能有读者来读

### 第一读者作者问题

首先，读者和作者之间一定是互斥的，所以用一个 bin 信号量 `wrt` 来控制当前的权限是读者的还是作者的。具体来说，`wrt` 只涉及到作者和第一、最后一个读者。

然后，为了判断当前的读者是否是最后一个读者，还要维护一个变量 `readerCnt`；然而这个变量只能同时被一个读者线程修改，所以还要放一个 bin 信号量 `mutex` 来进行限制。

```java
public class DataAccessPolicyManager {
  private int readerCount;
  private Semaphore mutex;  // for readerCount
  private Semaphore wrt;    // writer or reader

  public DataAccessPolicyManager() {
    readerCount = 0;
    mutex = new Semaphore(1);
    wrt = new Semaphore(1);
  }

  public void acquireReadLock() {
    mutex.acquire();
    ++readerCount;
    if (readerCount == 1)
      wrt.acquire();
    mutex.release();
  }

  public void releaseReadLock() {
    mutex.acquire();
    --readerCount;
    if (readerCount == 0)
      wrt.release();
    mutex.release();
  }

  public void acquireWriteLock() {
    wrt.acquire();
  }

  public void releaseWriteLock() {
    wrt.release();
  }
}
```

```java
// for reader
while (true) {
  accessManager.acquireReadLock();
  // do blabla
  accessManager.releaseReadLock();
}
// for writer
while (true) {
  accessManager.acquireWriteLock();
  // do blabla
  accessManager.releaseWriteLock();
}
```

### 第二读者作者问题

对于 reader 的限制加了一条，就是必须是当前没有 writer 申请权限。所以加一个 bin 信号量 `rdr`，表示是否有 writer 正在申请权限。

而且其实 writer 的数量也不一定是只有一个。所以 `rdr` 必须在 writer 数量归零的时候才能释放。于是又要加一个 `writerCnt` 变量和控制这个变量权限的 bin 信号量 `mutexW`。

体现在代码上，就是变量多了几个，以及 `acquireReadLock()` 和 WriteLock 的俩函数变了变，其他都一样。

```java
public class DataAccessPolicyManager2 {
  private int readerCount;
  private int writerCount;
  private Semaphore mutexR;
  private Semaphore mutexW;
  private Semaphore wrt;  // running writer or readers
  private Semaphore rdr;  // block for readers

  public DataAccessPolicyManager2() {
    readerCount = 0;
    writerCount = 0;
    mutexR = new Semaphore(1);
    mutexW = new Semaphore(1);
    wrt = new Semaphore(1);
    rdr = new Semaphore(1);
  }

  public void acquireReadLock() {
    rdr.acquire();
    mutexR.acquire();
    ++readerCount;
    if (readerCount == 1)
      wrt.acquire(); // ensure no writer
    mutexR.release();
    rdr.release(); // number of readers can be more than one
  }

  public void acquireWriteLock() {
    mutexW.acquire();
    writerCount += 1;
    if (writerCount == 1)
      rdr.acquire();
    mutexW.release();
    wrt.acquire(); // wait for existing writer or readers
  }

  public void releaseWriteLock() {
    mutexW.acquire();
    writerCount += 1;
    if (writerCount == 0)
      rdr.release(); // no writer, allow readers
    mutexW.release();
    wrt.release();
  }
}
```

不过 `rdr` 可能存在争吵现象。可以在 `acquireReadLock()` 的最开始再申请一个专用的 bin 信号量来避免争吵。
