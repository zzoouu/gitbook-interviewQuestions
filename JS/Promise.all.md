### Promise.all
Promise.all可以将多个Promise实例包装成一个新的Promise实例。
- 成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，
- 而失败的时候则返回最先被reject失败状态的值,一个失败，立马返回
```
let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
  resolve('success')
})

let p3 = Promse.reject('失败')

Promise.all([p1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']
}).catch((error) => {
  console.log(error)
})

Promise.all([p1,p3,p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)      // 失败了，打出 '失败'
})
```
romise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，即p1的结果在前，即便p1的结果获取的比p2要晚。这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，使用Promise.all毫无疑问可以解决这个问题

#### Promise.all处理多次reject
```
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('err 2')
    }, 2000)
})
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3)
    }, 3000)
})
let promises = [p1, p2, p3]
promises = promises.map(promise => {
    return promise.then(res => res).catch(err => err)
})
Promise.all(promises).then(res => console.log(res))
// [ 1, 'err 2', 3 ]
```
如果需要更多的信息，可以在then和catch中添加handle函数
```
const handleThen = res => {
    return {
        res,
        type: 'success'
    }
}
const handleCatch = err => {
    return {
        err,
        type: 'fail'
    }
}
promises = promises.map(promise => {
    promise.then(res => {
        handleThan(res)
    }).catch(err => {
        handleCatch(err)
    })
})
```
> 最多允许2(n)次失败,改造handleCatch函数

```
let count = 2
let errcount = 0
const handleCatch = err => {
    errcount++
    if(errcount >= count){
        return Promise.reject(`catch 超过了${count}次`)
    }else {
        return {
            err,
            type: 'fail'
        }
    }
}
```
### Promise.race
Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
```
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})
```