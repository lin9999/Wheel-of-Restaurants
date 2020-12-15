import './App.css';
import NormalLoginForm from './components/NormalLoginForm'
import {PieChartOutlined} from '@ant-design/icons'
import React from 'react'
import background from './imgs/background.png'

function App() {
    return (
        <React.Fragment>
            <img className="background" src={background} alt="Background"/>  
            <div>
                <NormalLoginForm></NormalLoginForm>
            </div>        


        </React.Fragment>
    );
}

export default App;
//<PieChartOutlined style={{ width: '100px'}}/> 