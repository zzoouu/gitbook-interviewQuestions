### 实现for
```
var t1 = new Date().getTime()
var a = 1
console.log('t1: ', new Date(t1));
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 10000; k++) {
        a++
    }
  }
}
var t2 = new Date().getTime()
var b = 1
console.log('t2: ', new Date(t2))
console.log('first time', t2 - t1)
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 100; k++) {
        b++
    }
  }
}
var t3 = new Date().getTime()
console.log('t3: ', new Date(t3));
console.log('two time', t3 - t2)
console.log(a, 'a')
console.log(b, 'b')
/**
 * 为什么 for 循环嵌套顺序会影响性能？
 */
 ```