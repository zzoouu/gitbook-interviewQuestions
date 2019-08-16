### 事件中的this  

一般某个类的实例方法中的this指实例本身，而在事件监听函数中不能通过this获取实例，返回的是 null或undefined

因为react.js调用传给它的方法时，不是通过对象调用，而是直接通过函数调用，需要手动的将实例方法bind到当前实例上
```
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(this)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this)}>React 小书</h1>
    )
  }
}
```
也可以在 bind 的时候给事件监听函数传入一些参数
```
class Title extends Component {
  handleClickOnTitle (word, e) {
    console.log(this, word)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
    )
  }
}
```

这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。也就是说，
```<Header onClick={…} /> ```
这样的写法不会有什么效果的

### state
setState 方法由父类 Component 所提供。当我们调用这个函数的时候，React.js 会更新组件的状态 state ，并且重新调用 render 方法，然后再把 render 方法所渲染的最新的内容显示到页面上

当你调用 setState 的时候，React.js 并不会马上修改 state。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新

#### state接受函数参数
React.js 会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象

setState 只能在已经挂载或者正在挂载的组件上调用
```
handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
```

### props
props 一旦传入进来就不能改变
```
static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }
```
defaultProps里面是对 props 中各个属性的默认配置。这样我们就不需要判断配置属性是否传进来了：如果没有传进来，会直接使用 defaultProps 中的默认属性

### 有/无状态组件
无状态组件：没有state的组件  
有状态组件：有state的组件  
状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性

### 状态提升
当某个状态（state）被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中无管理，用props传递数据或者函数来管理这种依赖或者影响的行为

### 挂载阶段生命周期
React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载

```
-> constructor():组件自身的状态的初始化工作
-> componentWillMount():组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等，就可以放在 componentWillMount 里面进行
-> render()
// 然后构造 DOM 元素插入页面
-> componentDidMount()
// ...
// 即将从页面中删除
-> componentWillUnmount():组件销毁的时候，做这种清场的工作
// 从页面中删除
```

### 更新阶段生命周期 
setState 导致 React.js 重新渲染组件并且把组件的变化应用到 DOM 元素上的过程，这是一个组件的变化过程
- shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
- componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
- componentWillUpdate()：组件开始重新渲染之前调用。
- componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。

### PropTypes
```
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isReruired
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
      </div>
    )
  }
}
```
PropTypes.array | bool | func | number | object | string | node | element

#### defalutProps
在不传入的时候有默认值
```

```
