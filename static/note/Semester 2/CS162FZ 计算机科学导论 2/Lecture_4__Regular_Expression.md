# Lecture 4: Regular Expression

## 正则表达式的几个符号

| 符号   | 含义     | 示例     |
|------|----------|----------|
| `*`  | 零或多次   | `x*`     |
| `+`  | 至少一次   | `x+`     |
| `?`  | 最多一次   | `x?`     |
| `[^]` | 不含     | `[^abc]`  |
| `[]` | 其中之一   | `[abc]`  |
| `l-r` | 范围之一   | `A-Z`    |
| `x{y}`| 恰好 y 次 | `x{3}`   |
| `x{y,}`| 至少 y 次 | `x{3,}`  |
| `x{y,z}`| y-z 次   | `x{3,5}` |
| `.`  | 任意字符   | `.`      |
| `\s` | 空白字符   | N/A      |
| `\S` | 非空白字符 | N/A      |
| `\d` | 数字     | N/A      |
| `\D` | 非数字   | N/A      |
| `\w` | 字母     | N/A      |
| `\W` | 非字母   | N/A      |
| `^`  | 行首     | `^xxx`   |
| `$`  | 行尾     | `xxx$`   |

## `java.util.regex` 包

这部分应该不是重点内容，先列出提纲，有时间就复习一下，没时间就算了

* `Pattern` 和 `Matcher` 类
* `PatternSyntaxException`

### 捕获组 Capturing groups

### `start()` 和 `end()` 方法

### `matches` 和 `lookingAt` 方法

### `replaceFirst` 和 `replaceAll` 方法

### `appendReplacement` 和 `appendTail` 方法

### `PatternSyntaxException` 的方法
