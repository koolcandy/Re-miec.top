# Lecture 1. Perspectives and Concepts

## 杂记

### Fault，Error，Failure

fault 是 static 的，一般就是指代码出错了

failure 动态（运行错了），external 的，一般是运行结果方面

error 就是 fault 导致的程序内部某些变量值啊之类的出错了的意思，是 internal 的

不必区分太明确，Slide2 的第 21 页有介绍

fault of commission 和 fault of omission 有一些区别，前者大概是写了多余代码或者写出了明知是错误的东西，后者大概是忘了实现这个功能或者出现了异常状况。详见 Slide 2 的第 24 页。

### Testing，Debugging

测试是为了发现 bug，调试是为了修复 bug

### Verification，Validation

verification 就是看看这个成品跟我的要求是否一致，通常是一个内部的过程（internal）

validation 是对于用户来讲的，看看是否满足用户的需求，而用户是外部（external）的
