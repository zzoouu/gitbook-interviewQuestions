### 如何实现一个new
- 创建一个新的对象 obj
- this指向新对象
- 实现继承 obj._proto_指向Obj.prototype 新对象的原型指向构造函数的原型
- 返回新对象（如果构造函数本身有返回值且是对象类型，返回本身的返回值，如果没有返回新的对象）

```
function New(){
    let Obj = [].shift.call(arguments) //  构造函数分离出来
    let obj = Object.create(Obj.prototype)
    <!-- let obj = Object.create({}) -->
    <!-- obj._proto_ = Obj.prototype // 新对象的原型指向构造函数的原型 -->
    let res = Obj.apply(obj,arguments) // 构造函数Obj的this指向改为新创建的对象obj
    return Object.prototype.toString.call(res) === '[object Object]' ? res : obj
}
```

### 构造函数、实例、原型、原型链
> 构造函数    

构造函数是在普通函数的前面加了运算符new，本质仍然是函数，所以仍有函数的prototype
> 实例  

由构造函数创造出来的对象
> 原型

原型指的是原型对象，需要靠函数的prototype属性和实例的_proto_属性来区别
> 原型链

从一个实例对象开始开始往上找，这个实例对象的_proto_属性就是这个实例对象的原型对象，如果这个实例对象为obj,则obj的原型对象为obj._proto_，
obj的原型对象本质仍然是一个对象，所以obj的原型对象有其自己的原型对象，即有_proto_属性，以此类推，一直到Object.prototype这个原型为止，Object.prototype._proto_ 为null

- 实例由构造函数创造
- 构造函数通过其prototype属性查找与其相关联的原型，若构造函数为C,C.prototype指与C相关联的原型对象，原型对象通过构造器constructor来查找与其相关的构造函数，所以C.prototype.constructor === C
- instanceof 判断实例对象的_proto_属性是否与构造函数的prototype属性指向同一地址 左边为实例，右边为构造函数
- 实例本身没有constructor属性，对象实例的constructor属性来自于引用的原型对象的constructor

### 关系网络
![avatart](https://user-gold-cdn.xitu.io/2018/10/17/16682a6a4c88f259?imageslim)
- 每个函数都有一个原型属性prototype对象
- 普通对象的构造函数是Object(),obj._proto_ === Object.prototype
- 函数对象都来自于Function.prototype
- 函数对象也是对象，所以Function.prototype._proto_ === Object.prototype
- 所有函数原型的都是Object()的实例
- Object.prototype._proto_ === null
- 所有构造器都来自于（原型）Function.prototype，甚至包括根构造器Object和Function，所有构造器都继承了Function.prototype的属性和方法

