import React,{Component} from 'react';
class Re extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val:'',
            onOff:true
        }
    }
    //input改变时触发change
    change = (ev) => {
        let {value:val} = ev.target;
        //解构赋值  接收父级传入的数据
        let {re,changeCount,name} = this.props;
        let {onOff} = this.state;
        //匹配正则，判断是否成功来确定开关
        onOff = re.test(val);
        //精确判断日期是否是正确的
        if(name == 'Date：'){
            //调用birthday，传入参数，得到开关状况
            onOff = this.birthday(val,re);
        }
        //
        changeCount(name,onOff);
        this.setState({val,onOff});
       
    }
    //精确判断日期方法
    birthday = (val,re) => {
        let str = val.replace(re,function($0,$1,$2,$3){
            return $1+'-'+$2+'-'+ $3
        });
        //字符串截取
        let arr = str.split('-');
        //设置时间
        let setdate = new Date(arr[0],arr[1]-1,arr[2]);
        //判断如果设置的时间大于现在的时间
       if(setdate.getTime() > Date.now()){
           //返回 false  证明不匹配，重新走输入匹配
           return false;
           //如果设置时间正常继续匹配
       }else{
           //匹配年月日
            let y = setdate.getFullYear();
            let m = setdate.getMonth() + 1;
            let d = setdate.getDate();
            //判断年月日
            if(y == arr[0] && m == arr[1] && arr[2] == d){
                return true;
            }else{
                return false;
            }
       }
    }

    render() { 
        //解构父级数据
        let {name,txt,re} = this.props;
        //解构解构自身数据
        let {val,onOff} = this.state;
        //正则匹配成功改变className
        return ( 
            <div>
                <span>{name}</span>
                <input 
                    className={onOff?'ok':'error'}
                    type="text"  
                    placeholder={txt}
                    onChange={this.change}
                    value={val}
                />
            </div>
         )
    }
}
 
export default Re;