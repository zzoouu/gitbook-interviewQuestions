### 单线程
 单线程会解决多线程带来的复杂的同步问题  
 计时器触发后不一定执行，可能需要等待，因为js是单线程
 
### 任务队列
1. 所有同步任务都在主线程上执行，形成一个执行栈
2. 主线程之外，有一个任务队列（task queue），只要异步任务有了结果，就在任务队列中放置一个事件
3. 执行栈执行完所有任务时，读取任务队列，对应的异步任务结束等待状态进入执行栈，开始执行
4. 只要主线程空了，就会读取任务队列，这就是js的运行机制

### Event Loop
遇到异步代码时，任务会被放进队列中  
不同的任务元放在不同的队列中：宏任务(macrotask)和微任务（microtask）
- 首先执行同步任务，属于宏任务
- 所有同步任务执行完毕，执行栈为空，看是否有异步任务需要执行
- 执行所有微任务
- 执行宏任务中的异步代码，比如setTimeout的回调函数

微任务：
    promise | process.nextTick | MutationObserver
宏任务：
    script | setTimeout | setInterval | setImmediate | I/O | UI rendering
    
*微任务不比宏任务快，宏任务中包含script，浏览器先执行宏任务，当有异步任务时才执行微任务*

### js单线程，浏览器多线程
浏览器的内核是多线程的，在内核的控制下同步执行，一个浏览器至少有三个常用线程：JavaScript引擎线程、GUI渲染线程、浏览器事件出发线程  
1、JavaScript引擎：基于事件驱动单线程，JavaScript引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JavaScript线程在运行JavaScript程序 

2、GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(Reflow)时,该线程就会执行，GUI渲染线程与JavaScript引擎是互斥的，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行  

3、事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JavaScript引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeout、也可来自浏览器内核的其他线程如鼠标点击、Ajax异步请求等，但由于JavaScript的单线程关系所有这些事件都得排队等待JavaScript引擎处理（当线程中没有执行任何同步代码的前提下才会执行异步代码）

### 多线程优缺点
优点：
- 将耗时较长的操作（网络请求，文件下载，音频下载，图片下载）放在自线程中执行，放置了主线程卡死
- 发挥多核的优点，提高cpu的使用率

缺点：
- 每开辟一个子线程，就会消耗一定的资源
- 若出现多个线程同时访问一个资源，会造成资源争夺的情况

### 经典面试题
```
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
/*
解题思路：
首先按照代码的执行顺序从上往下，js始终都是单线程的，先执行的肯定是同步任务，再根据进入任务队列的顺序先进先出，先微后宏。
微任务是一次性将队列中存在的微任务执行完毕，宏任务是一个一个先进先出。
Promise是一个构造函数，调用的时候会生成Promise实例。当Promise的状态改变时会调用then函数中定义的回调函数。
我们都知道这个回调函数不会立刻执行，他是一个微任务会被添加到当前任务队列中的末尾，在下一轮任务开始执行之前执行。
async/await成对出现，async标记的函数会返回一个Promise对象，可以使用then方法添加回调函数。await后面的语句会同步执行。但 await 下面的语句会被当成微任务添加到当前任务队列的末尾异步执行。
*/

/*
答案： 
> node8版本: script start -> async1 start -> async2 -> promise1 -> script end -> promise2 -> async1 end -> setTimeout
<= node8版本: script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout
这主要是node.js8版本与其他版本的差异，他们对await的执行方法不同
*/
```
 