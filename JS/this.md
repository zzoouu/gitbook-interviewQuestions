### this
this表示函数当前执行上下文  
js中函数调用主要有下面四种方式
- 函数调用
- 方法调用
- 构造函数
- 隐式调用

现看几个术语：
- 函数调用：执行构成函数主题的代码，例如：parseInt函数调用是parseInt('15')
- 调用的上下文：指this在函数体内的值，例如，map.set('key', 'value')的调用上下文是 map。
- 函数的作用域：是在函数体中可访问的变量、对象和函数的集合

#### 1.函数调用
当一个表达式为函数接着一个`(,一些逗号分隔的参数)`时，函数调用被执行，例如parseInt('15')或者IIFE(立即调用的函数表达式)
##### 函数调用中的this
> this在函数调用中是一个全局对象

```
function sum(a, b) {
   console.log(this === window); // => true
   this.myNumber = 20; // 将'myNumber'属性添加到全局对象
   return a + b;
}
// sum() is invoked as a function
// sum() 中的 `this` 是一个全局对象（window）
sum(15, 16);     // => 31
window.myNumber; // => 20
```
调用sum(15,16)时，JS 自动将this设置为全局对象，在浏览器中该对象是window  
当this在任何函数作用域(最顶层作用域:全局执行上下文)之外使用，this 表示 window 对象  
```
console.log(this === window); // => true
this.myString = 'Hello World!';
console.log(window.myString); // => 'Hello World!'
```
##### 严格模式下的函数调用中的this
> this在严格模式下的函数调用中为undefined

'use strict'  
'use strict'被插入到执行体的顶部，在其作用域内启用严格模式。
```
function multiply(a, b) {
  'use strict'; // 启用严格模式
  console.log(this === undefined); // => true
  return a * b;
}
multiply(2, 5); // => 10
```
当multiply(2,5)作为函数调用时，this是undefined
##### 陷阱：this在内部函数中的时候
```
const numbers = {
   numberA: 5,
   numberB: 10,
   sum: function() {
     console.log(this === numbers); // => true
     function calculate() {
       console.log(this === numbers); // => false
       return this.numberA + this.numberB;
     }
     return calculate();
   }
};
numbers.sum(); // => NaN
```
sum()是对象上的方法调用，所以sum中的上下文是numbers对象。calculate函数是在sum中定义的，
但calculate()是一个函数调用(不是方法调用)，它将this作为全局对象window(非严格模下)。即使外部函数sum将上下文作为number对象，它在calculate里面没有影响。  
sum()的调用结果是NaN，不是预期的结果5 + 10 = 15，这都是因为没有正确调用calculate  
通过调用calculator.call(this)| apply | 箭头函数 手动将calculate上下文更改为所需的上下文。
### 2.方法调用
当方法是存储在对象属性中的函数
```
const myObject = {
  // helloFunction 是一个方法
  helloFunction: function() {
    return 'Hello World!';
  }
};
const message = myObject.helloFunction();
```
helloFunction是myObject的一个方法，要调用该方法，可以这样子调用 :myObject.helloFunction  
当一个表达式以属性访问的形式执行时，执行的是方法调用，它相当于一个函数接着`(，一组用逗号分隔的参数)`  
> 区分函数调用和方法调用非常重要，因为它们是不同的类型。主要区别在于方法调用需要一个属性访问器形式来调用函数(obj.myFunc()或obj['myFunc']())，而函数调用不需要(myFunc())
```
const obj = {};
obj.myFunction = function() {
  return new Date().toString();
};
obj.myFunction(); // 方法调用

const otherFunction = obj.myFunction;
otherFunction();     // 函数调用
parseFloat('16.60'); // 函数调用
```
#### 方法调用中的this
> 方法调用中，this变成了对象本身  
```
const calc = {
  num: 0,
  increment: function() {
    console.log(this === calc); // => true
    this.num += 1;
    return this.num;
  }
};
// method invocation. this is calc
calc.increment(); // => 1
calc.increment(); // => 2
```
调用calc.increment()使increment函数的上下文成为calc对象。所以使用this.num来增加num属性是有效的  
JS对象从原型继承一个方法，当在对象上调用继承的方法时，调用的上下文仍然是对象本身  
在ES6 class 语法中，方法调用上下文也是实例本身  
#### 陷阱：将方法与其对象分离
方法可以从对象中提取到一个单独的变量const alone = myObj.myMethod。当alon单独调用时，与原始对象分离，此时函数调用就会发生，此时的this指向全局对象window严格模式下是undefined,而不是myObj    
方法在作为参数传递时与对象是分离
```
function Animal(type, legs) {
  this.type = type;
  this.legs = legs;  
  this.logInfo = function() {
    console.log(this === myCat); // => false
    console.log('The ' + this.type + ' has ' + this.legs + ' legs');
  }
}
const myCat = new Animal('Cat', 4);
// The undefined has undefined legs 
setTimeout(myCat.logInfo, 1000); 
```
setTimout(myCat.logInfo)以下情况是等效的：
```
setTimout(myCat.logInfo);
// 等价于
const extractedLogInfo = myCat.logInfo;
setTimout(extractedLogInfo);
```
将分离的logInfo作为函数调用时，this是全局 window  
可以通过bind或者箭头函数
### 3.构造函数的调用
当new关键词紧接着函数对象,`(,一组逗号分隔的参数)`时被调用，执行的是构造函数调用    
myObject.myFunction前面有一个new关键词时，JS会执行构造函数调用而不是原来的方法调用。
例如new myObject.myFunction()：  
1. 它相当于先用属性访问把方法提取出来extractedFunction = myObject.myFunction
2. 然后利用把它作为构造函数创建一个新的对象： new extractedFunction()
#### 构造函数中的this
> 在构造函数调用中 this 指向新创建的对象  
```
function Foo () {
  console.log(this instanceof Foo); // => true
  this.property = 'Default Value';
}
// Constructor invocation
const fooInstance = new Foo();
fooInstance.property; // => 'Default Value'
```
new Foo() 正在进行构造函数调用，其中上下文是fooInstance。 在Foo内部初始化对象：this.property被赋值为默认值  
#### 陷阱：忘记使用new
构造函数忘记使用new，就是函数调用，this是window对象 ，因此 Vehicle（'Car'，4）在 window 对象上设置属性。它并没有创建新对象。
```
function Vehicle(type, wheelsCount) {
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}
// 忘记使用 new 
const car = Vehicle('Car', 4);
car.type;       // => 'Car'
car.wheelsCount // => 4
car === window  // => true
```
### 4.隐式调用
使用call()或者apply()调用函数时，是隐式调用，改变函数执行上下文  
- .call(thisArg[, arg1[, arg2[, ...]]])将接受的第一个参数thisArg作为调用时的上下文，arg1, arg2, ...这些则作为参数传入被调用的函数
- .apply(thisArg, [args])将接受的第一个参数thisArg作为调用时的上下文，并且接受另一个类似数组的对象[arg1, arg2, ...]作为被调用函数的参数传入。
.call()接受一组参数，例如myFunction.call(thisValue, 'value1', 'value2')。  
.apply()接受的一组参数必须是一个类似数组的对象，例如myFunction.apply(thisValue, ['value1', 'value2'])。
#### 隐式调用中的this
> 在隐式调用中.call()或者.apply()中，this是第一个参数
### 5.绑定函数
绑定函数是与对象连接的函数。通常使用.bind()方法从原始函数创建。原始函数和绑定函数共享相同的代码和作用域，但执行时上下文不同    
myFunc.bind(thisArg[, arg1[, arg2[, ...]]])接受第一个参数thisArg作为绑定函数执行时的上下文，并且它接受一组可选的参数 arg1, arg2, ...作为被调用函数的参数。它返回一个绑定了thisArg的新函数
与.apply()和.call() 方法相反，它不会立即调用该函数，.bind()方法只返回一个新函数，在之后被调用，只是this已经被提前设置好了。 
``` 
unction multiply(number) {
  'use strict';
  return this * number;
}
const double = multiply.bind(2);

double(3);  // => 6
double(10); // => 20
```
bind(2)返回一个新的函数对象double，double 绑定了数字2。multiply和double具有相同的代码和作用域。
#### 绑定函数中的this
> 在调用绑定函数时，this是.bind()的第一个参数

.bind()的作用是创建一个新函数，调用该函数时，将上下文作为传递给.bind()的第一个参数。它是一种强大的技术，使咱们可以创建一个定义了this值的函数。
#### 紧密的上下文绑定
.bind()创建一个永久的上下文链接，并始终保持它。   
一个绑定函数不能通过.call()或者.apply()来改变它的上下文，甚至是再次绑定也不会有什么作用。  
只有绑定函数的构造函数调用才能更改已经绑定的上下文，但是很不推荐的做法(构造函数调用必须使用常规的非绑定函数)。
### 6.箭头函数
> this 定义箭头函数的封闭上下文(取决于声明的地方)

- 箭头函数的外层如果有普通函数，那么箭头函数的 this 就是外层普通函数的this
- 箭头函数的外层如果没有普通函数，那么箭头函数的 this 就是全局变量
- 箭头函数一劳永逸地与词汇上下文绑定。 即使修改上下文(call,bind,apply)，this也不能被改变  
- 箭头函数不能用作构造函数。 将它作为构造函数调用(new get())会抛出一个错误   
 

