// function curry(fn){
//     const args = Array.prototype.slice.call(arguments, 1)
//     return function (){
//         const args2 = Array.prototype.slice.call(arguments)
//         if(args.length === 0){
//             return fn.apply(this, args)
//         }else{
//             args.push(args2)
//         }
//     }
// }
// function curry(fn, args){
//     const len = fn.length
//     console.log(len)
//     args = Array.prototype.slice.call(arguments, 1) || []
//     return function(){
//         const _args = [].slice.call(arguments)
//         console.log(args, _args)
//         Array.prototype.push.apply(_args, args)
//         if(_args.length < len){
//             return curry.call(this, fn, _args)
//         }else{
//             fn.apply(this, _args)
//             return this
//         }
//     }
// }
// function add(){
//     const args = Array.prototype.slice.call(arguments)
//     return args.reduce((pre, cur) => pre + cur, 0)
// }
// console.log(curry(add,1,2,3,4)(1,2))


// vuepress
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class myPromise {
    constructor(fn) {
        this.state = PENDING
        this.value = null
        this.reason = null
        const resolve = value => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
            }
        }
        const reject = reson => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
            }
        }
        try {
            fn(resolve, reject)
        } catch (reason) {
            reject(reason)
        }
    }
    then(onFull, onReject) {
        if (this.state === FULFILLED) {
            const x = onFull(this.value)
            console.log(x, 'x', x.then.toString())
        }
        if (this.state === REJECTED) {
            onReject(this.reason)
        }
    }
}
let p = new myPromise((resolve, reject) => {
    resolve('222')

})
p.then(res => {
    console.log(res)
    return new myPromise((resolve, reject) => {
        resolve('in')
    })
})


