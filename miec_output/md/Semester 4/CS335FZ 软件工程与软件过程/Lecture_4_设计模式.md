# Lecture 4 设计模式

【注意】这一节当中有好多长得像 UML 类图的东西，其实并不是。GOF 书上第一章说，这些东西是 OMT 表示法。其中「multiplicity: many」的图示，在后面出现次数挺多的。

![OMT 表示法](https://s2.loli.net/2023/06/20/c4JwvnA8ykqFIPY.png)

每一个设计模式都描述了环境中反复出现的一个问题以及核心解决方案。于是，这种解决方案就可以被重复利用。

使用设计模式是为了重用代码（resue）、让代码更容易被他人理解，同时保证代码可靠性。

## 动机（设计模式怎样解决设计问题）

- 寻找合适的对象。将系统分解为对象的集合，由于要考虑到的因素太多，所以这个是很难得一个过程。设计模式就描述了这种设计方法。
- 确定对象 *粒度（granularity）*。大的对象可以表示整个系统，小的对象可能只是个硬件。对象在大小和数目上变化极大。应该如何决定一个对象应该是什么？
- 运用复用机制，提高可重用性。有继承（inheritance）和组合（composition）两种复用方式。继承就是生成子类（白箱）；组合就是组装一些对象来获得更复杂的（黑箱）。
- design for changes

## 分类

设计模式的种类有非常多。根据 *目的（purpose）* 和 *范围（scope）* 可以进行分类。

目的有三种：

- 创建型（creational），与对象的创建有关
- 结构型（structural），处理类或对象的组合
- 行为型（behavioral），描述类或对象怎样交互、怎样分配职责

范围有两项：

- 类（class），处理类和子类之间的关系，这些关系在编译的阶段就确定了，是静态的
- 对象（object），处理对象之间的关系，比较动态，运行时可变

![设计模式分类](https://s2.loli.net/2023/04/23/IRlSsPLqByTFfQN.png)

## 模式的基本要素

GOF 书当中认为有四个基本要素：

- 模式名（pattern name）：用来记忆它
- 问题（problem）：就是重复出现的问题，相当于描述了什么时候使用这个设计模式
- 解决方案（solution）：描述了设计的组成成分，以及它们之间的关系、职责和协作方式
- 效果（consequence）：描述了使用该模式的效果以及权衡（trades-off）

有的教材认为基本要素只有前三点。

## 单件模式 Singleton Pattern（对象创建型模式）

> - 目的：创建型
> - 范围：对象

### 别名

无

### 意图

保证一个类仅有一个实例，并保证这个实例易于访问（全局访问）。

### 适用情景

- 只能有一个实例，且客户可以从一个众所周知的访问点去访问（access）
- 客户无需对代码进行修改，就可以使用子类（？）

### 应用场景

课件上列出来了几个，但是 yyf 不太理解。

- 线程池
- OS 使用文件系统管理文件
- 访问硬件的接口（一个打印机只能有一个驱动实例，要不然两个实例同时打印就乱套了）
- 静态的配置数据
- 日志记录器
- 缓存的访问

### 结构

![单件模式结构图](https://s2.loli.net/2023/04/23/i3sF7BqxSbWgka5.png)

加号代表 `public`，减号代表 `private`。

### 优缺点

优点：

- 可以严格的控制客户如何、何时访问实例
- 可以代替全局变量，缩小命名空间
- 实例数目可变，根据需要，可以是双件、三件、n 件模式

缺点就是，在多线程编程当中应当格外小心，比如线程阻塞之类的。

### 例子

想象一个场景。有一个打印机，假设拥有两个驱动程序。两个用户同一时间对于两个驱动发出了指令。于是两个驱动同事要打印机打印内容。然后，打印机把两个用户的两个文档像洗牌一样混在一起打出来了。

![打印机问题示例](https://s2.loli.net/2023/04/23/pin5lTR7EICGZuk.png)
![打印机问题示意图](https://s2.loli.net/2023/03/22/aPBwKjQY9SNoAeV.png)

如何避免这种情况？有两种方案，一个是使用静态方法，另一个是使用 singleton pattern。

#### 解决方案：使用静态方法

这是一种简单粗暴的解决方案。

![静态方法解决方案](https://s2.loli.net/2023/04/23/pGSUTLtowAsM3eH.png)

静态方法就是指，把 `print()` 设置成静态且同步的（`synchronized public`），那么他就可以保证同一时间只有一个 `print()` 的副本在运行。

#### 解决方案：使用单件模式

```java
public class PrinterDriver {
    // 存储一个自身的静态实例
    private static PrinterDriver printerDriver;

    // 构造函数是 private 的，那么就没有别的东西可以创建我这个类的实例了
    // 于是就保证了实例的唯一
    private PrinterDriver() {
    }

    // 同步且 public 的方法保证同一时间只会有一个操作人获取到驱动
    // 但这种写法的缺点是可能会造成线程阻塞
    synchronized public static PrinterDriver getPrinterDriver() {
        if (printerDriver == null) {
            printerDriver = new PrinterDriver();
        }
        return printerDriver;
    }

    // 同步且 public
    synchronized public void print(String name, int numOfPages) {
        for (int i = 0; i < numOfPages; i++)
            Printer.print(name + ",\t Page: " + i);
    }
}
```

PS: `synchronized` 关键字的作用，在 CS240 当中也有提到过。

上述写法缺点是可能会造成线程阻塞。如果直接使用全局变量（定义实例的时候直接初始化）又会造成资源的浪费。课件中提到，当中 `enum` 是 Java 当中实现单件模式的最好办法：

```java
public enum PrinterDriver {
    PRINTER_DRIVER;

    synchronized public void print(String name, int numOfPages) {
        for (int i = 0; i < numOfPages; i++)
            Printer.print(name + ",\t Page: " + i);
    }
}
```

### 静态方法 vs 单件模式

- 任意一个类都可以访问其他类的静态变量。而单例模式可以更轻松地实现权限控制（谁获取到了 instance 谁就有权限）。
- 静态方法只能存在一个 copy，而单件模式如有需要可以扩展成双、三件模式
- 在一些编程语言中（C++），静态方法（全局变量）会污染命名空间，而单件模式不用创建变量，所以不需要考虑这个烦人的问题。

### 类似的模式

![类似模式](https://s2.loli.net/2023/03/29/qwbPnWBR5rfMTI2.png)

## 工厂方法模式 Factory Method Pattern（类创建型模式）

> - 目的：创建型
> - 范围：类

### 别名

虚拟构造函数（Virtual Constructor）

### 意图

定义一个用于创建对象的接口，让子类决定实例化哪一个类。换句话说，工厂方法模式使一个类的实例化延迟到子类。

### 适用情景

- 当一个类不知道它所必须创建的对象的类的时候
- 当一个类希望由它的子类来决定它所创建的对象的时候
- 当类把创建对象的责任委托（delegate）给多个帮助子类（helper classes）当中的某一个，并且你希望将「哪一个帮助子类是代理者」这一信息局部化（localize）的时候

### 结构

工厂方法模式当中，有几个东西：

- Product & Concrete Product
- Creator & Concrete Creator

![工厂方法模式结构图](https://s2.loli.net/2023/04/23/VZHDymlzpTue1At.png)

Creator 当中包含了操作和工厂方法（返回产品），Concrete Creator 当中只有工厂方法（返回具体产品）

回顾 UML 类图的记号：

- 空心箭头表示「实现」或「泛化」
- UML 类图没有明确实心虚线箭头的含义。但是有说虚线箭头含义：「依赖」。

### 例子

想象一个场景。Linux 当中有好多种不同的日志文件，有的是内核日志，有的是权限日志，还有其他类型的一堆日志。如何根据日志文件的类型，创建对应的日志解析器？

#### 解决方案：根据上下文实例化对象

![根据上下文实例化对象](https://s2.loli.net/2023/04/23/aX3FN6ygq2LbiKD.png)
![根据上下文实例化对象代码](https://s2.loli.net/2023/04/23/CDyGAPHmKEs3qIw.png)

在这个例子当中：

- `interface LogParser` 是 Product，仨具体的 `xxLogParser` 是 Concrete Product
- `class LogDisplayer` 是 Creator，仨具体的 `xxLogDisplayer` 是 Concrete Creator

#### 解决方案：工厂方法模式：参数化

![工厂方法模式：参数化](https://s2.loli.net/2023/04/23/jHWMUEIF8POKy7t.png)
![工厂方法模式代码](https://s2.loli.net/2023/04/23/6banHIEXT2Nwlt7.png)

YYF 虽然能理解工厂方法的含义了，但是感觉代码里面这一堆乱七八糟的继承很乱。

## 外观模式 Facade Pattern（对象结构型模式）

> - 目的：结构型
> - 范围：对象

### 别名

无

### 意图

它为子系统中的一组接口，提供一个一致的界面。Facade 模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

![外观模式意图](https://s2.loli.net/2023/04/23/GZNLRanuKsPCAId.png)

### 结构

![外观模式结构图](https://s2.loli.net/2023/04/23/j1nfqmgz9hZpBQl.png)

### 适用情景

- 当要为一个复杂的子系统提供一个简单的接口的时候
- 由于客户程序与抽象类的实现部分之间，存在很大的依赖性，因此将一个子系统与其他子系统分离，可以提高子系统的独立性和可移植性
- 使用 Facade 模式定义子系统每层的入口点（一个层次的系统）

如果理解不了，就尝试结合一下图示。

### 应用场景

- OS 用 Facade 模式把好多框架都弄成了一个
- 编译器，把汇编语言隐藏起来
- Web 服务
- 数据库连接器使用 Facade 模式把建立连接的复杂操作隐藏起来

编译器的 Facade：
![编译器Facade](https://s2.loli.net/2023/04/23/UiXus5bPV2y8cNJ.png)

## 适配器模式 Adapter Pattern（类对象结构型模式）

> - 目的：结构型
> - 范围：类和对象

### 别名

包装器（wrapper）

### 意图

将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不 *兼容（compatible）* 而不能一起工作的那些类，可以一起工作。

想象：不同国家的电源适配器。

### 结构

俩 Target 都是接口，俩 Adaptee 都是接口的实现。

#### 类适配器

![类适配器结构](https://s2.loli.net/2023/04/23/rIG5msypY41zOPZ.png)

#### 对象适配器

注意这里 Adapter 从 Adaptee 那里的继承关系变成了普通的 Association 关系

![对象适配器结构](https://s2.loli.net/2023/04/23/CA8g2XYH5FUuwnx.png)

### 适用情景

- 想使用一个存在的类，但是它的接口不符合要求
- 想要创建一个可以复用的类，让这个类与其他不相关的类以及不可预见的类（即不一定兼容接口的类）能够协同工作
- （仅适用于对象适配器）想要使用一些已经存在的子类，但是不可能对每一个都进行子类化以匹配它们的接口。对象适配器可以适配父类接口。

### 应用场景

- 数据库多用户权限控制
- toolkit class 的接口不兼容
- 接口连接不兼容的，内存卡、电源适配器等。

### 例子

想象一个情景：现在有一个文件操作工具，针对文本文件，可以打开、显示内容、显示文件大小、显示文本行数。

但是，假如现在新增了一个音乐文件，这个文件操作工具就不适配了！

也就是说对于文本文件和音乐文件，它们的操作是不尽相同的。文本需要显示，音乐需要播放。显示和播放，应当使用不同的 API。而它们也有共有的操作，比如显示文件名、计算文件大小等。

对于类，则使用继承。对于对象，则使用组合。

#### 解决方案：继承文本操作器得到一个音乐适配器

![类适配器示例](https://s2.loli.net/2023/04/23/5CYoRpae8riIHcl.png)
![类适配器示例代码](https://s2.loli.net/2023/04/23/YQW6Ra3XOyZsFdA.png)

#### 解决方案：

绿色部分没有发生变化。由于蓝色部分，没有了类的继承，所以要多写几个 Override 来实现接口。

![对象适配器示例](https://s2.loli.net/2023/04/23/wia17vz2WHJdBsc.png)
![对象适配器示例代码](https://s2.loli.net/2023/04/23/8ud5O2legYZvamS.png)

### 比较：类适配器 vs 对象适配器

#### 类适配器

- 当我们想要适配一个类及其 **所有子类** 时，类适配器将 **不** 起作用。
- 适配器会 **覆盖 Adaptee** 的某些行为。

#### 对象适配器

- 单个 Adapter 可与多个 Adaptee 配合使用
- Adapter 还可以一次为所有 Adaptee 添加功能
- 更难覆盖 Adaptee 的行为。

## 观察者模式 Observer Pattern（对象行为型模式）

> - 目的：行为型
> - 范围：对象

### 别名

- 依赖（Dependents）
- 发布-订阅（Publish-Subscribe）

### 意图

定义了对象之间的一种一对多的依赖关系。当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知，并自动更新。

### 结构

这个的结构好像不是很好理解。

- Subject 相当于发布者（目标），它知道它的观察者。它要提供注册和删除观察者对象的接口。
- Observer 相当于订阅者（观察者）。为那些在目标发生改变时需要获得通知的对象，定义一个更新接口
- 具体目标，将有关状态存入各个具体目标对象，且状态发生改变的时候，向它的各个订阅者发出通知
- 具体观察者，维护一个指向具体观察者对象的引用，存储有关状态，这些状态应当与目标的状态保持一致。此外还要实现观察者的更新接口，以使自身状态与目标状态保持一致。

![观察者模式结构图](https://s2.loli.net/2023/04/23/7WtE8iUVvONlGQd.png)

### 适用情景

- 改变一个对象的时候也需要同时改变其他的对象，但是不知道有哪些要改变
- 一个对象需要通知其他对象，但是这个对象不一定知道要通知谁们
- 一个抽象模型有两个方面，其中一个依赖于另一个

### 例子

有两个（也可能不止）不同的人，都关注了一个项目，希望项目发生改变的时候收到通知。

但是代码好像不好懂。

![观察者模式示例](https://s2.loli.net/2023/04/23/ErcfuixbQd2aRpY.png)

## 设计模式的选择

- 考虑设计模式是如何帮助你解决问题的
- 分析各个设计模式的意图（intent），找到合适的
- 了解不同设计模式之间的关系
- 思考如何让代码可重用

## 23 种设计模式概述

![23种设计模式](https://s2.loli.net/2023/04/23/S4pBeWqOUsagM6E.png)

## 补充知识：Java 当中类和接口的区别？

https://www.geeksforgeeks.org/differences-between-interface-and-class-in-java/

| Class                                                              | Interface                                                              |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| The keyword used to create a class is “class”                     | The keyword used to create an interface is “interface”                 |
| A class can be instantiated i.e., objects of a class can be created. | An **Interface cannot be instantiated** i.e. objects cannot be created. |
| Classes **do not** support multiple inheritance.                   | The interface supports **multiple inheritance**                        |
| It can be inherited from another class.                            | It cannot inherit a class.                                             |
| It can be inherited by another class using the keyword `extends`. | It can be inherited by a class by using the keyword `implements` and it can be inherited by an interface using the keyword `extends`. |
| It can contain constructors.                                       | It cannot contain constructors.                                        |
| It cannot contain abstract methods.                                | It **contains abstract methods only**.                                   |
| Variables and methods in a class can be declared using any access specifier(`public`, `private`, `default`, `protected`). | **All** variables and methods in an interface are declared as `public`. |
| Variables in a class can be `static`, `final`, or **neither**.   | All variables are `static` and `final`.                               |
