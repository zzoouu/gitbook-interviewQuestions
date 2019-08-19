### symbol
> Symbol表示独一无二的值，是JavaScript的第七种数据类型  

> ES6引入这一类型的用意在于，常常我们在命名的时候会有相同名称冲突的问题

> Symbol值通过Symol函数生成，对象的属性名可以为原有的字符串，也可以为新增的Symbol类型
1. 概述
```
let s = Symbol()
typeof s // 'Symobl'
```
Symbol函数前面不能用new命令，否则会报错，因为Symbol函数生成的值是一个原始类型的值，不是对象，是一个类型字符串的数据类型  
Symbol函数接受一个参数，是对Symbol实例的描述
```
let s1 = Symbol('s1')
s1 // Symbol(s1)
s1.toString() // Symbol(s1)
// 添加了描述这一参数能知道是哪个值
```
如果Symbol函数的参数是一个对象，调用该对象的toString()方法将其转变成字符串，再生成值
```
const obj = {
    toString(){
        return '123'
    }
}
const s1 = Symbol(obj)
s1 // Symbol(abc)
```
Symbol函数的参数只是表示对当前Symbol值的描述，因此相同参数的Symbol函数的返回值不同  
Symbol 值不能与其他类型的值进行运算，会报错。 

typeof在判断所有的Symbol的值的时候返回类型将会是Symbol

2. Symbol.prototype.description
Symbol.prototype.description: 返回Symbol的描述
```
const sym = Symbol('desc')
// 读取描述
String(sym) // 'Symbol(desc)'
sym.toString() // 'Symbol(desc)'

// 新增方法
sym.description // 'desc'
```
3. 作为属性名的Symbol
```
let sym = Symbol()
// 一
let a = {}
a[sym] = 'hello'

// 二
let a = {
    [sym]: 'hello'
}

// 三
let a = {}
Object.defineProperty(a, sym, { value: 'hello' })

// result 
a[sym] // hello
```
Symbol值作为对象属性名时，不能用点运算符，而且使用Symbol值定义属性时，Symbol值必须发放在方括号之中  
4. 属性名遍历
- Symbol作为属性名，该属性不会出现在 for..in | for...of 循环中
- 也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是它还有个私有属性方法可以获取指定对象的所有Symbol属性名。
- Object.getOwnPropertySymbols，它返回的是一个数组，成员是该对象所有用作属性名的 Symbol值
- 我们还可以通过新API Reflect.ownkeys方法 返回所有类型的键名，包括常规键名和 Symbol键名。
```
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};
Reflect.ownKeys(obj)
```
5. Symbol.for() Symbol.keyFor()
有时候我们希望重新使用同一个 Symbol值，Symbol.for方法可以做到这一点，它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值  
```
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true
```
Symbol.for() VS Symbol:
- 前者会被登记在全局环境中供搜索，后者不会。
- Symbol.for()不会每次调用就返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。  

Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key 就是和 Symbol.for()对应使用。
```
let s1 = Symbol.for('foo')
Symbol.keyFor(s1)   // 'foo'

let s2 = Symbol('foo')
Symbol.keyFor(s2)   // undefined
```
6. 内置的Symnbol值
6.1. Symbol.match
> 指向一个函数，当执行 str.match(myObject)时，如果该属性存在，则调用它，返回该方法的返回值。
6.2. Symbol.replace | Symbol.search | Symbol.split 
> 对象的Symbol.replace属性，指向一个方法。当对象被 String.prototype.replace方法调用的时候，会返回该方法的值  

6.3 Symbol.iterator
> 对象的 Symbol.iterator属性，指向该对象默认的遍历器方法  

6.4 Symbol.toPrimitive
> 对象的Symbol.toPrimitive属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。Symbol.toPrimitive被调用时，会接受一个字符串参数，表示当前运算的模式，一共有三种模式

6.5 Symbol.toStringTag
> 对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。

6.6 Symbol.hasInstance
> 一个内部方法，当其他对象使用 instanceof 运算符，判断是否为该对象的实例时会调用这个方法