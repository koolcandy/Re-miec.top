# Lecture 2&3: Methods

有时候，方法也叫做过程（无返回值）、函数（有返回值）等。

方法的名字也跟变量、类一样：must begin with a letter, or with `_` or `$`

## 访问权限

方法的访问权限分为 `private`，`protected`，`public` 以及未指定四类。
- `private`: 仅可以在类的内部访问
- `protected`: 仅可以在自己和子类当中访问
- `public`: 无限制
- 未指定：仅可以在当前 package 内访问

## 存根类

函数体为空的方法称作 stub（存根）。

通常，stub 是 `void` 类型；或者在接口（`interface`）中被声明，用于表达 common operations。

## `static` 关键字

如果一个方法没有被 `static` 修饰，那么必须创建一个对象才能执行它（instance method 实例方法）。

如果想要从类的外面执行一个 `static` 方法，需要写成：`<ClassName>.<StaticMethodName>`.

## 形式参数和实际参数

* 形式参数（formal parameter），函数头那个位置的
* 实际参数（actual parameter），调用的时候传进去的

## 方法签名（method signature）

方法签名是指，`方法名(参数类型, 参数类型, 参数类型 ...)`。

## 方法重载（method overloading）

同一个类当中可以由多个重名的方法，只要参数列表的数量和类型不完全相同即可。

但如果只是返回值不同，不能重载。

## 接口 interface

### 接口是啥

Java 当中的接口，是一组有关联的方法，方法体为空。这些方法定义了对象与外界的交互。
例如，电视机上的电源按钮，就是人类世界与其内部导线的接口。
例如，下面这段代码，就是一个接口：

```java
interface Bicycle {
  void changeCadence(int val);
  void changeGear(int val);
  void speedUp(int inc);
  void applyBrakes(int dec);
}
```

### 接口咋用

如果要在一个类当中使用某个接口，则类的定义需要用关键字 `implements` 修饰。例如：

```java
class ACMEBycycle implements Bicycle {
  int cadence = 0;
  int speed = 0;
  int gear = 0;

  void changeCadence(int val) { cadence = val; }
  void changeGear(int val) { gear = val; }
  void speedUp(int inc) { speed += inc; }
  void applyBrakes(int dec) { speed -= dec; }
}
```

不过 YYF 目前还没太理解，接口到底是干啥的。。

## 关于传值和传引用

原生数据类型是传值，对象是传引用。

引用，是指，对象的内存地址。而接受了引用的方法，会根据这个引用找到相应的内存地址，直接对那里的内容进行操作。

## `String` 是不可修改的（immutable）

比如，有

```java
String s = "hello";
String s2 = s;
String s = "world";
```

那么，`s2` 的值依然是 hello。这是因为，第三行代码，只是新开了一个值是 world 的字符串，把 s 的引用指向那个内存，并不是把 s 指向的内存的内容设置成 world。

关于传值传引用、数组和字符串的详细内容，参考课件 3 的 10~20 页。

## 可变参数方法

Java 中有一种很简单的可变参数方法写法。仅需要把参数列表写成 `类型... 变量名`，形如：

```java
public static void main() {
  int sum1 = sum(1);
  int sum2 = sum(1, 2);
  int sum5 = sum(1, 2, 3, 4, 5);
}
public static int sum(int... args) {
  int ans = 0;
  for (int i : args) ans += i;
  return ans;
}
```
