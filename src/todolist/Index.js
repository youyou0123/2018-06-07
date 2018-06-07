import React,{Component} from 'react';
import ToHeader from './head';
import ToList from './list';
import ToFooter from './footer';
import './css/index.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr:[
                {name:"呵呵0",id:0,checked:true},
                {name:"呵呵1",id:1,checked:false}
            ],
            stateAll:'all'
        }
    }
    //选择按钮
    changeChecked = (id) => {
        //解构当前数据
        let {arr} = this.state;
        arr.forEach(e=>{
            if(e.id === id){
                //让选中状态取反
                e.checked = !e.checked
            }
        });
        //重新渲染数据
        this.setState({arr});
    }

    //添加数据
    add = (obj) => {
        let {arr} = this.state;
        arr.unshift(obj);
        this.setState({arr});
    }

    //全选按钮
    checkedAll = (ev) => {
        let {checked} = ev.target;
        let {arr} = this.state;
        //循环数据，所有的都选中全选就选中
        arr.forEach(e=>e.checked=checked);
        this.setState({arr});

    }

    //删除按钮
    deleFn = (id) => {
        let {arr} = this.state;
        arr = arr.filter(e=> e.id!=id);
        this.setState({arr});
    }
    //看当前传过来的是被点击的哪一个，根据状态渲染样式
    changState = (stateAll) => {
        //根据传过来的状态渲染页面
        this.setState({stateAll});
    }

    //修改内容
    changeText = (newVal,id) => {
        let {arr} = this.state;
        arr.forEach(e=>{
            if(e.id === id){
                e.name = newVal
            }
        });
        //渲染数据
        this.setState({arr});
    }

    //
    render() { 
        let {arr,stateAll} = this.state;
        let all = arr.length?arr.every(e=>e.checked):false;
        let len = arr.length;

        let arr2 = arr.filter((e,i)=>{
            if(e.checked) len --;
            switch(stateAll){
                case  'all':
                    return e;
                break;
                case  'active':
                    return !e.checked;
                break;
                case  'completed':
                    return e.checked;
                break;
            }
        })

        let newArr = arr2.map((e,i)=>{
            return <ToList {...{
                key:i,
                txt:e.name,
                id:e.id,
                checked:e.checked,
                ccFn:this.changeChecked,
                deleFn:this.deleFn,
                changeText:this.changeText
            }}/>
        }) 
        return ( 
            <section className="todoapp">
                <div>
                    <ToHeader {...{add:this.add}}/>
                    <section className="main">
                        <input 
                            className="toggle-all" 
                            type="checkbox" 
                            checked={all}
                            onClick = {this.checkedAll}
                        />
                        <ul className="todo-list">
                            {newArr}
                        </ul>
                    </section>
                    <ToFooter 
                        lenn={len} 
                        cs={this.changState}
                    />
                </div>
            </section>
         )
    }
}
 
export default App;