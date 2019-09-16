### instanceof
A instanceof B —— 判断B的prototype是否在A的原型链上  
判断一个实例是否是其父类型或者祖先类型的示例
```
function myInstanceof(L, R){
    L = L._proto_
    if(L){
        if(L === R.prototype){
            return true
        }else {
            return myInstanceof(L, R)
        }
    }else {
        return false
    }
}
function A(name, age){
    this.name = name
    this.age = age
}
var a = new A('zouzou', 21)
myInstanceof(a,A) // true
```