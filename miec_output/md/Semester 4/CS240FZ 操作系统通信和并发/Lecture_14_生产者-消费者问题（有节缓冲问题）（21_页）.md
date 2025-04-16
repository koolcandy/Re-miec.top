# Lecture 14 生产者-消费者问题（有节缓冲问题）（21 页）

## Java 里面一些好用的东西

接下来的代码主要使用 Java 而不是 C。

### `synchronized`

Java 当中，每一个 object 都拥有一个自己的锁。不过这个锁一般情况下是被忽略的（比如通过这个对象自己的成员函数访问的时候）。

但是这个对象的方法，如果声明成了 `synchronized`，那么，调用这个方法的线程，就必须拥有这个对象的锁才行。比如 CS335 里面关于打印机的那个代码就用到了 `synchronized` 这个关键字。

如果这个对象已经被锁住了，那么尝试调用这个方法的线程就会被阻塞，放入一个队列里面。如果没被锁住，那就被这个调用线程上锁，执行结束再解锁。

![image](https://s2.loli.net/2023/06/13/AVwYdJBbrLHthvq.png)

## Java 实现信号量类

- P 就是 acquire
- V 就是 release
- 代码不长，考试可能需要默写

```java
public class Semaphore {
    private int value;

    public Semaphore(int value) {
        this.value = value;
    }

    public synchronized void acquire() {
        while (value == 0) {
            try {
                // Calling thread waits until semaphore is free
                wait();
            } catch (InterruptedException e) {
            }
        }
        value = value - 1;
    }

    public synchronized void release() {
        value = value + 1;
        notify();
    }
}
```

## 有界缓冲问题（Lab7）

生产者产生一些东西，然后给消费者进行加工。然而，生产者消费者之间是异步的。换句话说，由于生产者和消费者的速度不一样，所以需要一个缓冲区（buffer）来存储数据。

那么，这个缓冲区，就是一个 critical 的东西。

许多需要协作的系统组件都会涉及到这个问题。

![image](https://s2.loli.net/2023/06/13/JsGBb5iHWcfEFwP.png)

### 解决办法：使用三个信号量

- 只有缓冲区有剩余空间的时候，生产者才能往里面放东西。因此定义一个信号量 `empty` 初始化为 `n`
- 只有缓冲区非空的时候消费者才能那东西。因此定义一个信号量 `full` 初始化为 `0` 表示实时大小
- 生产者消费者同时只能有一个访问缓冲区，是互斥的，因此定义一个二进制信号量 `mutex`

#### `Buffer` 类

```java
public class Buffer {
  private static final int BUFFER_SIZE = 5;
  private Object[] buffer;
  private int in, out;
  private Semaphore mutex;
  private Semaphore empty;
  private Semaphore full;

  // 类的构造函数
  public Buffer() {
    in = 0;
    out = 0;
    buffer = new Object[BUFFER_SIZE];
    mutex = new Semaphore(1);  // 互斥信号量
    empty = new Semaphore(BUFFER_SIZE);  // 用于表示是否有空余
    full = new Semaphore(0);   // 用于计数
  }

  public void insert(Object item) {
    empty.acquire();  // 必须是有空余才能插入
    mutex.acquire();  // 互斥锁
    buffer[in] = item;
    in = (in + 1) % BUFFER_SIZE;
    mutex.release();
    full.release();
  }

  public Object remove() {
    full.acquire();   // 必须有东西才能那东西
    mutex.acquire();  // 互斥锁
    Object item = buffer[out];
    out = (out + 1) % BUFFER_SIZE;
    mutex.release();
    empty.release();
    return item;
  }
}
```

#### 生产者和消费者类

这两个类由于要多线程化，所以需要实现 `Runnable` 接口，重载 `run()` 方法

```java
public class Producer implements Runnable {
  private Buffer buffer;
  private int id;

  public Producer(Buffer buffer, int id) {
    this.buffer = buffer;
    this.id = id;
  }

  public void run() {
    Date msg;

    while (true) {
      msg = new Date();  // produce an item
      try {
        Thread.sleep(3000); // Sleep for 1000 ms
      } catch (InterruptedException e) {
      }
      buffer.insert(msg);
      System.out.println("Inserted: " + msg.toString() + " by producer #" + id);
    }
  }
}
```

```java
import java.util.Date;

public class Consumer implements Runnable {
  private Buffer buffer;
  private int id;

  public Consumer(Buffer buffer, int id) {
    this.buffer = buffer;
    this.id = id;
  }

  public void run() {
    Date msg;
    while (true) {
      try {
        Thread.sleep(4000); // Sleep for 1000 ms
      } catch (InterruptedException e) {
      }
      msg = (Date) buffer.remove();
      System.out.println("Removed: " + msg.toString() + " by consumer #" + id);
    }
  }
}
```

可以看到，生产者和消费者类当中，只需要简单的调用 `buffer.insert()` 和 `buffer.remove()` 就好了，非常非常方便。
