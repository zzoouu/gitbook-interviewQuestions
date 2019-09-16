### 手写call
- 判断当前this是否为函数，防止Function.prototype.myCall()直接调用
- context为可选参数，如果不传的话，默认为window
- 为context创建一个Symbol(保证不回重名)属性，将当前函数赋值给这个属性
- 处理参数，传入参数
- 执行函数后删除Symbol属性
```
Function.prorotype.myCall = function(context = window, args){
    if(this === Function.prototype){
        // 防止Function.prototype.myCall()直接调用
        return undefined
    }
    context = context || window
    const fn = Symbo()
    // this === 调用myCall的函数
    // func.myCall -> this === func
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}
```

### 手写apply
```
Function.prototype.myApply = function(context, arr){
    if(this === Function.prototype){
        return undefined
    }
    const fn = Symbol()
    context[fn] = this
    let result
    if(Array.isArray(args)){
        result = context[fn](...args)
    }else {
        result = context[fn]()
    }
    delete context[fn]
    return result
}
```
### 手写bind
- 返回一个函数
- 判断是否作为构造函数调用，如果是则用new调用当前函数
- 如果不是，用apply，传入context和处理好的参数
```
Function.prototype.myBind = function(context, ...args1){
    if(this === Function.prototype){
        return undefined
    }
    const _this = this
    return function F(...args2){
        // 判断是否用于构造函数
        if(this instanceof F){
            return new _this(...args1, ...args2)
        }
        return _this.apply(context, args1.concat(args2))
    }
}

```