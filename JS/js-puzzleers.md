### 1、["1", "2", "3"].map(parseInt) = [1,NaN,NaN]
#### parseInt(string,radix)
> 基数radix不代表进制，而是把string看作什么进制的数

- 无radix参数时  
  若string以“0x”开头，将其看作16进制来处理
  若string以0开头，将其后的字符解析成八进制或十六进制的数字
  若string以1-9开头，将其后字符解析成十进制的数字

- 有radix参数时
  按radix指定的进制来处理


```
parseInt("17",6) = 1
// 解析17时，7< 6不属于6进制范围，当string的数字小于radix(6<7)只会解析到其上一位
parseInt("17",6) = parseInt("1", 6) = 1


parseInt("17",9) = 16 
// 1*9^1+7*9^0 = 16

```
parseInt('1',0) = parseInt('1',10) = 1  
parseInt('2',1) 2<radix<16 => NaN  
parseInt('3',4)  3<4 NaN

### 2、[typeof null, null instanceof Object] = ["object", false]

null不是一个空引用,被认为是对象的占位符，技术上是一个原始值,它只是期望此处将引用一个对象,注意是"期望".    
typeof null结果是object,这是个历史遗留bug

#### typeof
typeof返回一个表达式的数据类型的字符串，返回结果为javascript中的基本数据类型，包括：number、boolean、string、object、undefined、function等6种数据类型

typeof 可以准确的判断除object以外的基础数据类型，但不能区分object类型的具体类型，比如 Array 、Date 以及自定义类
typeof null = object

#### instanceof
instanceof 本意是用来判断 A 是否为 B 的实例对象

本质上Null和Object不是一个数据类型，null值并不是以Object为原型创建出来的。所以null instanceof Object是false。

null不具有任何对象的特性，就是说我们并不能执行null.toString()、null.constructor等对象实例的默认调用  
  
undefined 是声明了变量但未对其初始化时赋予该变量的值  
null 则用于表示尚未存在的对象,如果函数或方法要返回的是对象，那么找不到该对象时，返回的通常是 null  
10 + null = 10  
10 + undefined = undefined


### 3、[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ] = error 
> reduce on an empty array without an initial value throws TypeError

#### Math.pow(x,y):
x的y次方，如果返回结果为负或者虚数，返回NaN。如果由于指数过大而引起浮点溢出，则该方法将返回 Infinity

x,y必须为数字， 且非传入两个参数时，都返回NaN 

#### Array.reduce(callback(accumulator, currentValue, currentIndex, array),initialVal)

### 4、var val = 'smtg';console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing') 结果：Something
#### 优先级
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence

- ()
- . || [...] || new (args) || 函数调用
- new (no args)
- ...++ ...--
- ! ~ + - ++... --... typeof void delete await
- **
- * / %
- + -
- << >> >>>
- < > <= >= in instanceof 
- == != === !==(等号)
- &
- ^
- |
- &&
- ||
- ? :
- = += -=........(赋值)
- yield yield*
- ...(展开运算符)
- ,


### 5、var name = 'World!';
(function () {
    if (typeof name === 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);
    } else {
        console.log('Hello ' + name);
    }
})();

结果：Goodbye Jack

变量提升

### 6、var END = Math.pow(2, 53);
var START = END - 100;
var count = 0;
for (var i = START; i <= END; i++) {
    count++;
}
console.log(count);

结果：other

Math.pow():如果由于指数过大而引起浮点溢出，则该方法将返回 Infinity

2^53是最大值，不能比它再大

### 7、var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;});

结果：[]
> Array.prototype.filter is not invoked for the missing elements(invoked:调用)  

filter:被删除或者从来未被赋值的元素不会被遍历

### 8、var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
[two - one == one, eight - six == two]

结果： [true, false]
> JavaScript does not have precision math, even though sometimes it works correctly.(精确的)

### 9、function showCase(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase(new String('A'));

结果：Do not know
> switch uses === internally and new String(x) !== x

### 10、function showCase2(value) {
    switch(value) {
    case 'A':
        console.log('Case A');
        break;
    case 'B':
        console.log('Case B');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('Do not know!');
    }
}
showCase2(String('A'));

结果： Case A
> String(x) does not create an object but does return a string, i.e. typeof String(1) === "string"

### 11、function isOdd(num) {
    return num % 2 == 1;
}
function isEven(num) {
    return num % 2 == 0;
}
function isSane(num) {
    return isEven(num) || isOdd(num);
}
var values = [7, 4, '13', -9, Infinity];
values.map(isSane);

结果：[true,true,true,false.false]
> Infinity % 2 gives NaN, -9 % 2 gives -1 (modulo operator keeps sign so it's result is only reliable compared to 0)

### 12、parseInt(3, 8)
parseInt(3, 2)
parseInt(3, 0)

结果：[3,NaN,3]
> 3 doesn't exist in base 2, so obviously that's a NaN, but what about 0? parseInt will consider a bogus radix and assume you meant 10, so it returns 3

### 13、Array.isArray( Array.prototype )

结果：true
> 鲜为人知的事实：其实 Array.prototype 也是一个数组(MDN)

### 14、var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}

结果：false
> [0] as a boolean is considered true. Alas, when using it in the comparisons it gets converted in a different way and all goes to hell

== 三条规则：  
- undefined与null相等；
- 字符串和bool都转为数字再比较；
- 对象转换成基础类型再比较

x==y 流程：
1、x和y是否类型相同  
2、是否为null == undefined    
3、是否为string == number,string转number  
4、是否为boolean == any bool转number  
5、是否为oobject ==  string、number、symbol，object转基本类型

### 15、'5' + 3  
'5' - 3 

结果：“53”，2

### 16、1 + - + + + - + 1
结果：2

### 17、var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; });

结果：[1,,,]
> The result is ["1", undefined × 2], as map is only invoked for elements of the Array which have been initialized

### 18、function sidEffecting(ary) {
  ary[0] = ary[2];
}
function bar(a,b,c) {
  c = 10
  sidEffecting(arguments);
  return a + b + c;
}
bar(1,1,1)

结果：21
> The result is 21, in javascript variables are tied to the arguments object so changing the variables changes arguments and changing arguments changes the local variables even when they are not in the same scope

### 19、var a = 111111111111111110000,
    b = 1111;
a + b;

结果：11111111111111111000

### 20var x = [].reverse;
x();
 结果：window
> [].reverse will return this and when invoked without an explicit receiver object it will default to the default this AKA window

### 21、var x = [].reverse;
x();
结果：true
> Number.MIN_VALUE is the smallest value bigger than zero, -Number.MAX_VALUE gets you a reference to something like the most negative number

### 22、[1 < 2 < 3, 3 < 2 < 1]
结果：[true,true]
> false变为0，true变为1

### 23、2 == [[[2]]]
结果：true

### 24、3.toString()
3..toString()
3...toString()
结果：[error,"3",error]
> 3.toString()貌似被当成(3.)toString来解析了
而3..toString()则被当成(3.).toString所以正常


### 25、(function(){
  var x = y = 1;
})();
console.log(y);
console.log(x);

结果：[1,error]
> y全局

### 26、var a = /123/,
    b = /123/;
a == b  
a === b
结果：false false
> 对象 

### 27、var a = [1, 2, 3],
    b = [1, 2, 3],
    c = [1, 2, 4]
a ==  b
a === b
a >   c
a <   c
结果：false false false true

### 28、var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b]
结果：[false,true]

### 29、function f() {}
var a = f.prototype, b = Object.getPrototypeOf(f);
a === b

结果：false
> f.prototype is the object that will become the parent of any objects created with new f while Object.getPrototypeOf returns the parent in the inheritance hierarchy

### 30、function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name]
结果： ["foo","foo"]
> name is a read only property. Why it doesn't throw an error when assigned, I do not know

### 31、"1 2 3".replace(/\d/g, parseInt)
结果："1 NaN 3"
> String.prototype.replace invokes the callback function with multiple arguments where the first is the match, then there is one argument for each capturing group, then there is the offset of the matched substring and finally the original string itself. so parseInt will be invoked with arguments [1, 0], [2, 2], [3, 4]

#### replace(regexp,callback)
callback(match,p1,p2,..,offset,string)
- match:匹配的子串
- p1,p2...：第n个括号匹配的字符串（$1,$2）
- offset:匹配的子字符串的偏移量
- string：

### 32、function f() {}
var parent = Object.getPrototypeOf(f);
f.name // ?
parent.name // ?
typeof eval(f.name) // ?
typeof eval(parent.name) //  ?
结果："f", "Empty", "function", error
> The function prototype object is defined somewhere, has a name, can be invoked, but it's not in the current scope

### 33、var lowerCaseOnly =  /^[a-z]+$/;
[lowerCaseOnly.test(null), lowerCaseOnly.test()]
 
 结果：[true,true]
 > the argument is converted to a string with the abstract ToString operation, so it is "null" and "undefined"
 
 ### 34、[,,,].join(", ")
 结果：", , "
 > JavaScript allows a trailing comma when defining arrays, so that turns out to be an array of three undefined.
 
 ### 35、var a = {class: "Animal", name: 'Fido'};
a.class
 结果：other
 > The answer is: it depends on the browser. class is a reserved word, but it is accepted as a property name by Chrome, Firefox and Opera. It will fail in IE. On the other hand, everybody will accept most other reserved words (int, private, throws etc) as variable names too, while class is verboten
 
 取决于浏览器
 
 ### 36、var a = new Date("epoch")
 结果：invalid data
 
 ### 37、var a = Function.length,
    b = new Function().length
a === b
结果： false
> It's false. Function.length is defined to be 1. On the other hand, the length property of the Function prototype object is defined to be 0

### 38、var a = Date(0);
var b = new Date(0);
var c = new Date();
[a === b, b === c, a === c]
结果：[false,false,false]
> When Date is invoked as a constructor it returns an object relative to the epoch (Jan 01 1970). When the argument is missing it returns the current date. When it is invoked as a function, it returns a String representation of the current time.

### 39、var min = Math.min(), max = Math.max()
min < max

结果：false
> Math.min returns +Infinity when supplied an empty argument list. Likewise, Math.max returns -Infinity.

 无参数时,Math.min()返回Infinity;Math.max()返回-Infinity
 
 ### 40、function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe  = /num=(\d+)/ig,
    wordRe = /word=(\w+)/i,
    a1 = captureOne(numRe,  "num=1"),
    a2 = captureOne(wordRe, "word=1"),
    a3 = captureOne(numRe,  "NUM=2"),
    a4 = captureOne(wordRe,  "WORD=2");
[a1 === a2, a3 === a4]  
结果：[true,false]

### 41、var a = new Date("2014-03-19"),
    b = new Date(2014, 03, 19);
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()]
结果：[false,false]

Date()中月份index对应为+1月份

### 42、if ('http://giftwrapped.com/picture.jpg'.match('.gif')) {
  'a gif file'
} else {
  'not a gif file'
}
 
 结果：'a gif file'
 
### 43、function foo(a) {
    var a;
    return a;
}
function bar(a) {
    var a = 'bye';
    return a;
}
[foo('hello'), bar('hello')]
结果：['hello','bye']

http://javascript-puzzlers.herokuapp.com/