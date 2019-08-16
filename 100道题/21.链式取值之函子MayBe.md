### 链式取值之函子MayBe
> 函子： 是一个普通对象（容器），它实现了map函数，在遍历每个对象值的时候返回一个新的对象

如果一个数据结构比较复杂，层级较深，在取值时容易出现错误
```
res.data.appstore.item.name  
// Cannot read property 'name' of undefined
```

往往可能会报错：Uncaught TypeError: Cannot read property 'goods' of undefined

我们可以自己进行校验，如：
```
res && res.data && res.data.appstore && res.data.appstore.item && res.data.appstore.item.name
```
可以看到很不优雅，如果数据层级再深，那么效果可以想象了！

```
class Maybe {
    constructor(value) {
        this._value = value
    }
    get value() {
        return this._value
    }
    
    // 返回一个新的对象
    static of(value) {
        return new Maybe(value)
    }
    
    // 处理值为null或undefined的错误
    isNothing = () {
        return this._value === null || this._value === undefined
    }
    map = fn {
        return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
    }
    
    // 方便取值
    attr = key => {
        return this.map(ojb => obj[key])
    }
}

```
在普通的MayBe函子中使用attr,方便取值

若容器中的值为null或undefined时，isNothing将错误处理，返回Maybe.of(null)，map不会使用传入的函数


可以感受到 MayBe函子轻松的处理值为null或undefined的错误

