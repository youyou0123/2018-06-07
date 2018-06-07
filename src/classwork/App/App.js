
import React,{Component} from 'react';
//引入App的样式
import './App.css';
//引入正则
import Re from '../regexp/regexp';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //设置数组，传入每一项的参数
            arr:[
                {
                    name:'QQ：',
                    txt:'请输入QQ',
                    re:/^[1-9]\d{4,10}$/,
                    count:false
                },
                {
                    name:'Email：',
                    txt:'请输入邮箱',
                    re:/^[A-Za-z][\w]{6,11}@[0-9a-z]{2,8}((\.com|\.cn)|(\.com\.cn))$/,
                    count:false
                },
                {
                    name:'Mobile：',
                    txt:'请输入手机号码',
                    re:/^1[3-9]\d{9}$/,
                    count:false
                },
                {
                    name:'Date：',
                    txt:'请输入生日',
                    re:/^(\d+)\D+(\d+)\D+(\d+)\D?$/,
                    count:false
                }
            ]
        }
    }
    //匹配正则
    changeCount = (name,onOff) => {
        //解构当前数据
        let {arr} = this.state;
        //循环数据 每次输入的时候  匹配当前的name
        arr.forEach(e=>{
            //判断当前name如果等于数据中的name
            if(e.name === name){
                //将开关的状态赋值给当前的count
                e.count = onOff
            }
        })
        //重新渲染数据
        this.setState({arr});
    }

    render() { 
        //把arr的数据给子级组件使用
        let {arr} = this.state;
        //
        let all = arr.every(e=>e.count);
        //往组件中传入数据  return返回复用的三个组件
        let newArr = arr.map((e,i)=>{
            
            return (<Re {...{
                name:e.name,
                txt:e.txt,
                re:e.re,
                key:i,
                changeCount:this.changeCount
            }}/>)
        })
        return (
            <div id="contain">
                {newArr}
                <p>
                    <input
                        className={all?'succ':'fail'}
                        type="button" 
                        value="注册" 
                        id="btn" 
                    /></p>
            </div>
        )
    }
}
 
export default App;