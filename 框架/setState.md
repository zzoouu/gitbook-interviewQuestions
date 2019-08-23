### setState
setState不是同步的，执行之后不会立刻得到state的值，可通过setState的第二个参数回调函数获取，react会维护一个state的更新队列，每次调用setState会把当前修改的state添加进这个队列，最后，react会对这个队列进行合并处理，然后执行回调，然后更新虚拟dom，再进行渲染

好处：将state的更新延缓到最后批量合并再去渲染对于性能优化有好处，如果每次状态的更新都渲染真实的dom的话，会带来巨大的性能消耗

#### 非真实异步
react封装了一系列 onClick,onChange这些合成事件，setTimeout及原生事件中调用，可以立马获取最新的state,合成事件则不行

react会维护一个标识(idBatchingUpdates),判断是直接更新还是先放进state队列，setTimeout和原生事件会直接更新state，因此可以立刻得到最新state，而合成事件和react生命周期函数中，是受react控制的，isBatchingUpdates设置为true，走异步的一套

```
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log 0

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log 0

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log 2

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log 3
    }, 0);
  }

  render() {
    return null;
  }
};
```

cmd + alt + 左箭头、右箭头
ctrl + tab
ctrl + shift + tab


