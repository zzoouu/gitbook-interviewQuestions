### let const
> 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取    

es5中，顶层对象的属性和全局变量是等价的，var和function声明的全局变量就是顶层对象的属性
···
var a = 1
console.log(a) // 1
console.log(window.a) // 1
···
es6中，var和function声明的变量依然是顶层对象的属性，let和const、class声明的全局变量不属于顶层对象的属性
```
var a = 1
const b = 2
let c = 3
console.log(window.a) // 1
console.log(window.b) // undefined
console.log(window.c) // undefined
console.log(b, c) // 2 3
```

- ES5声明变量只有两种方式：var和function。
- ES6有let、const、import、class再加上ES5的var、function共有六种声明变量的方式。
- 还需要了解顶层对象：浏览器环境中顶层对象是window，Node中是global对象。
- ES5中，顶层对象的属性等价于全局变量。(敲黑板了啊)
- ES6中，有所改变：var、function声明的全局变量，依然是顶层对象的属性；let、const、class声明的全局变量不属于顶层对象的属性，也就是说ES6开始，全局变量和顶层对象的属性开始分离、脱钩

es6中let和const声明的变量 在定义变量的块级作用域中就能获取，既然不属于顶层对象，那就不加 window（global)
在作用域为Script对象中,和Window/Global同级。