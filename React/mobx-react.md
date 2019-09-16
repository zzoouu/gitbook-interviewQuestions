### [mobox-react](https://github.com/mobxjs/mobx-react)

> 包含react**组件包装器**的包，用于将react和mobx结合使用，导出observer装饰器和其他工具

#### 基于类的组件observer和@observer

##### observer
被装饰的类组件或者独立渲染的函数组件被转换为“反应组件”，这些“反应组件”可以追踪那些可观察对象,且在其中一个值发生变化时，自动重新渲染组件

当用于类组件的时候，this.props和this.state将进行观察，该组件在props和state发生变化时，作出反应重新渲染


所有呈现可观察数据的组件可以被标记为observer，反之，若为了减少通用组件间的依赖关系，可以只传递普通数据

用法:
```
import { observer } from 'mobx-react'
 // 1
 const obs1 = observer(
    class Mobx1 extends React.Component {
        render() {
            return ()
        }
    }
 )
 
 
 // 
 @observer
 class Mobx2 extends React.Component {
     render() {
         return ()
     }
 }


// 3
const Mobx3 = observer(({ obj }) => <h1>observer</h1>)
```

#### Observer
Observer是一个组件，它需要一个无参数的函数，只返回一个react组件，函数中的组件将被跟踪在需要时自动重新渲染

用法： 
```
class Mobx extends React.Component {
    render() {
        return (
            <div>
            //  下面两种方法不能同时使用
            // 1
                <Observer>{() => <p>{this.props.obj.name},Observer是组件</p>}</Observer>
            // 2
                <Observer render={() => <p>this.props.obj.name</p>} />
                
            </div>
        )
    }
}

const obj = observerble({ name: 'lijian' })

ReactDOM.render(<App obj={obj}/>,document.body)

obj.name = 'xxx' // obj 改变，Observer区域重新渲染

```



#### provider和inject
> provider和inject 用于传递stores（数据）  

 provider是一个可以通过React的上下文机制将stores（存储的数据）传递给子组件的组件
 
 inject 用来接受那些传递过来的stores（数据），可接受一个字符串列表，并将这些stores（数据）使用于包装的组件
 
 可以简单的理解为，provider将数据传递给子组件，inject将传递过来的数据用于包装的组件，该组件可以使用传递过来的数据
 
 用法： 
 ```
 @inject('data')
 @observer
 class Mobx1 extends React.Component {
     render() {
         return (
            <p>{this.props.data.name}</p>
         )
     }
 }
 

 ReactDOM.render(
 // data 此处为定义
    <Provider {...data}>
        <Mobx1 />
    </Provider>,
    document.body
 )
 ```
**当同时使用inject和observer时要注意两者顺序，inject为外装饰，observer为内装饰，中间还可以有其他装饰器**
 





