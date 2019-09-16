
### promise
#### 使用
```
let promise = new Promise((resolve, reject) => {
    resolve('success')
})
promise.then(res => {
    console.log(res)
}, err => {
    console.log(err)
})
```
#### 基本实现
- 三个状态，且不可逆
- 接收一个函数，参数为resolve, reject
- resolve和reject对状态的改变
- then catch finally all race resolve reject
```
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class myPromise{
    constructor(fn){
        this.state = PENGING
        this.value = undefined
        this.reason = undefined
        const resolve = value => {
            if(this.state === PENDING){
                this.state = FULFILLED
                this.value = value
            }
        }
        const reject = reason => {
            if(this.state === PENDING){
                this.state = REJECTED
                this.reason = reason
            }
        }
        try{
            fn(resolve, reject)
        }catch(error){
            reject(reason)
        }
    }
    then(sucess, fail){
        if(this.state === FULFILLED){
            success(this.value)
        }
        if(this.state === REJECTED){
            fail(this.reason)
        }
    }
    <!-- 如没有定义reject方法，所有的异常走向catch -->
    catch(fail){
        return this.then(null, fail)
    }

    <!-- 不管是resolve还是reject都会调用finally -->
    finally(fn){
        return this.then(vlaue => {
            fn()
            return value
        }, reason => {
            fn()
            throw reason
        })
    }
    <!-- 生成一个直接处于FULFILLED状态的promise -->
    resolve(value){
        return new myPromise((resolve, reject) => {
            resolve(value)
        })
    }
    <!-- 生成一个直接处于REJECTED状态的promise -->
    reject(reason){
        return new myPromise((resolve, reject) => {
            reject(reason)
        })
    }
    all(promises){
        return new myPromise((resolve, reject) => {
            if(promises.length === 0){
                resolve([])
            }else {
                let reault = []
                let index = 0
                for(let i = 0; i<promises.length; i++){
                    promises[i].then(data => {
                        result[i] = data
                        if(++index === promises.length){
                            resolve(result)
                        }
                    }, err => {
                        reject(err)
                        return
                    })
                }
            }
        })
    }
    race(promises){
        return new myPromise((resolve, reject) => {
            if(promises.length === 0){
                resolve()
            }else {
                let index = 0
                for(let i = 0;i< promises.length; i++){
                    promises[i].then(data => {
                        resolve(data)
                    }, err => {
                        reject(err)
                        return
                    })
                }
            }
        })
    }
}
let p = new myPromise((resolve, reject) => {
    resolve('222')
})
p.then(res => {
    console.log(res)
})
```
#### then的链式调用
- then中返回一个值，无论是成功还是失败的回调，都会进入到下一个then的成功态里
- then返回一个promise实例，根据promise实例的状态决定在下一个then的哪一个状态里面
```
function resolvePromsie(promise2, x, resolve, reject){
    let called
    if(promise2 === x){
        return reject(new TypeError('changeing'))
    }
    if(x && (typeof x === 'object' || typeof x === 'function')){
        try{
            let then = x.then
            if(typeof then)
        }
    }else {
        <!-- x是一个常量 -->
        if(called) return
        called = true
        resovle(x)
    }
}
```