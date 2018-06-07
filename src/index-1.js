import React from 'react';
import ReactDOM from 'react-dom';
// import App from './ChildToParent/App/app';
// import App from './todolist/Index';
import App from './classwork/App/App';

ReactDOM.render(
    <App />
    ,
    //获取最上层的标签
    document.getElementById('root')
)
//阻止刷新
if(module.hot){
    module.hot.accept();
}
 
